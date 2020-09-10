/*
 * @file: user.js
 * @description: It Contain function layer for user service.
 * @author: Pankaj Pandey
 */

import config from 'config';
import User from '../collections/user';
import { generateOTP } from '../utilities/universal';
import moment from "moment";
import path from 'path';
import momentZone from "moment-timezone";
import Message from '../utilities/messages';
import { uploadFormDataFile, uploadDocument } from '../utilities/upload';
import { encryptpassword, generateToken, generateRandom, uploadImagebyBase64 } from '../utilities/universal';
import * as Mail from '../utilities/mail';
import { ROLE, LIMIT, RADIUS, TWILIO } from '../utilities/constants';
import Notifications from "../push/notification";
import { NOTIFICATION_CATEGORY, NOTIFICATION_MESSAGE } from "../utilities/constants";
const client = require('twilio')(TWILIO.accountSid, TWILIO.authToken);
const { webUrl } = config.get('app');
const fs = require("fs"); 
var url = require('url');
 

function sendOtp(otp, number){
  return client.messages.create({
    body: otp +' is registration verification otp for Bestpay app. Do not share it with anyone.',
    from: TWILIO.number,
    to: number
  });
}

/********** Save user **********/
export const save = async req => {
  const payload = req.body;
  if (await User.checkEmail(payload.email)) throw new Error(Message.emailAlreadyExists);
  payload.password = encryptpassword(payload.password);
  payload.email = payload.email.toLowerCase();
  payload.OTP = {number: await generateOTP(6)};
  const userData = await User.saveUser({
    ...payload
  });
  
  const mobileNumber = `${payload.mobile.code}${payload.mobile.number}`;
  //await sendOtp(payload.OTP, mobileNumber);

  let token = generateToken({
    when: new Date(),
    role: userData.role,
    lastLogin: userData.lastLogin,
    userId: userData._id
  });
  const result = await Mail.htmlFromatWithObject(
    {
      data: { username: `${payload.firstName} ${payload.lastName}` ,
      link: `${webUrl}/api/v1/confirmation/${token}`}
    },
    "user-account"
  );
  const emailData = {
    to: payload.email,
    subject: Mail.subjects.userAccount,
    html: result.html
  };

  Mail.sendMail(emailData, function(err, res) {
    if (err)
      console.log("-----@@----- Error at sending verify mail to user -----@@-----", err);
    else
      console.log("-----@@----- Response at sending verify mail to user -----@@-----",res);
  });
  await User.onLoginDone(userData._id, token);
  return { token: token}
};


export const otpVerification = async req => {
  const userData =  await User.findOneByCondition({_id: req.user.userId, "OTP.number": req.body.OTP})
  if(userData){
    const OTP = { number: "", isVerified: true }
    const payLoad = { userId: userData._id, OTP: OTP }
    await User.updateUser(payLoad);
  }
  return userData;
}


/********* Update user info *********/
export const updateUserInfo = async payload => {
  if(payload.files){
    const fileData = payload.files.file.data;
    const folder = `images/profilepic/${payload.userId}`;
    const fileName = `${Date.now()}-${payload.files.file.name}`;
    const imageUploadStatus = await uploadFormDataFile(fileData, folder, fileName);  
    if(imageUploadStatus){
      const imgObject = {
          filename: fileName,
          src: `${payload.appUrl}/images/${folder}/original/${fileName}`,
          thumbnail: `${payload.appUrl}/images/${folder}/thumbnail/${fileName}`,
        };
        payload.profileImage = imgObject;
        return await User.updateUser(payload);
    }
  }
  return await User.updateUser(payload);
};


/********* Update user kyc *********/
export const updateUserKYC = async payload => {
  if(payload.files){
    const fileData = payload.files;
    const folder = `documents/kyc/${payload.userId}`;
    const docUploadStatus = await uploadDocument(fileData, folder); 
    if(docUploadStatus){
      const kycObject = {
          kyc: {
            type: payload.type,
            fileName: payload.files.file.name,
            fileUrl: `${payload.appUrl}/documents/${folder}/${payload.files.file.name}`,
            filePath: path.join(__uploadDir, `${folder}/${payload.files.file.name}`)
          }
        };
      const requestObj = {
        kyc: kycObject,
        userId: payload.userId
      }
      await User.updateKyc(requestObj);  
    }  
  }
};

/*********** Add credit/debit cards ***********/
export const addCard = async payload => {
  let userCard = await UserCard.findOneByCondition({
    userId: payload.userId
  })
    .populate('userId', 'email')
    .select({ userId: 1, customerId: 1 });
  if (!userCard) {
    userCard = await User.findOneByCondition({
      _id: payload.userId
    }).select({ email: 1 });

    return Stripe.createCustomer({
      ...payload,
      userId: userCard._id,
      email: userCard.email
    });


  } else {
    return Stripe.createSource({ ...payload, ...userCard });
  }
};

/*****connected account  ****/
export const createConnectedAccount = async payload => {
const userData = await User.findOneByCondition({_id: payload.userId});
payload.createdAccountNumber = userData.createdAccountNumber;
payload.country = userData.country;
payload.currency = userData.currency;
const accountInfo = await Stripe.createConnectedAccount(payload);
if(accountInfo === "done"){
   const updatedUserInfo = await User.updateUser({userId : payload.userId, externalAccountCreated : 1});
   return updatedUserInfo.externalAccountCreated;
   //return accountInfo;
}else{
  return accountInfo;
}
};

export const getAccountLinkService = async payload => {
  const userData = await User.findOneByCondition({_id: payload.userId});
  payload.createdAccountNumber = userData.createdAccountNumber;
  const accountlinkInfo = await Stripe.createConnectedAccountLinks(payload);
  return accountlinkInfo;
}

/********** Login users **********/
export const onLogin = async payload => {
  const role = payload['role'] ? [payload['role']]: [ROLE.CENTRALOFFICEUSER, ROLE.MARKEDLOCATIONUSER];
  const conditionObj = {};
  conditionObj.email = payload.email.toLowerCase();
  conditionObj.password = encryptpassword(payload.password);
  conditionObj.role = { $in: role };
  const userData = await User.findOneByCondition(conditionObj);

  if (!userData) throw new Error(Message.invalidCredentials);
  if(userData.role === 2){
    if (userData.email_verified === 1 && userData.status === 0) 
      throw new Error("doctorProfileVerificationPending");
  }
  if (userData.email_verified === 0) throw new Error(Message.accountNotActivated);
  let loginToken = generateToken({
    when: new Date(),
    role: userData.role,
    lastLogin: userData.lastLogin,
    userId: userData._id
  });
  const data = await User.onLoginDone(userData._id, loginToken, payload);
  return {
    _id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    loginToken: data.loginToken[data.loginToken.length - 1].token,
    lastLogin: data.lastLogin,
    role: data.role,
    uid: data.uid,
    profileImage: data.profileImage,
    terms_aggrement_verified: data.terms_aggrement_verified
  };
};

/********** Chatbot Login after verify email **********/
export const onChatbotLoginVerificationDone = async payload => {
  const role = payload['role']
    ? [payload['role']]
    : [ROLE.CENTRALOFFICEUSER, ROLE.MARKEDLOCATIONUSER];
  const conditionObj = {};
  conditionObj.email = payload.email;
  conditionObj.role = { $in: role };
  const userData = await User.findOneByCondition(conditionObj);
  if (!userData) throw new Error(Message.invalidCredentials);
  
  if (userData.status === 0) throw new Error(Message.accountNotActivated);
  let loginToken = generateToken({
    when: new Date(),
    role: userData.role,
    lastLogin: userData.lastLogin,
    userId: userData._id
  });
  const data = await User.onLoginDone(userData._id, loginToken, payload);
  return {
    _id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    loginToken: data.loginToken[data.loginToken.length - 1].token,
    role: data.role,
    paymentInfo: data.paymentInfo,
    externalAccountCreated: data.externalAccountCreated,
    socketId: data.socketId,
    terms_aggrement_verified: data.terms_aggrement_verified
  };
};

/********** Chatbot Login users **********/
export const onChatbotLogin = async payload => {
  const role = payload['role']
    ? [payload['role']]
    : [ROLE.CENTRALOFFICEUSER, ROLE.MARKEDLOCATIONUSER];
  const emailId = payload['email'] ? payload['email'].toLowerCase(): "";
  const conditionObj = {email: emailId};
  const userData = await User.findOneByCondition(conditionObj);
  if (!userData) throw new Error(Message.invalidCredentials);
  if(userData.role === 2){
    if (userData.email_verified === 1 && userData.status === 0) 
      throw new Error("doctorProfileVerificationPending");
  }
  
  if (userData.email_verified === 0) throw new Error("accountNotActivated");

  let loginToken = generateToken({
    when: new Date(),
    role: userData.role,
    lastLogin: userData.lastLogin,
    userEmail: userData.email,
    userId: userData._id
  });

  const result = await Mail.htmlFromatWithObject(
    {
      data: { username: `${userData.firstName} ${userData.lastName}` ,
        link: `${webUrl}/api/v1/loginConfirmation/${loginToken}`}
    },
    "user-login"
  );
  const emailData = {
    to: payload.email,
    subject: Mail.subjects.userLogin,
    html: result.html
  };

  Mail.sendMail(emailData, function(err, res) {
    if (err)
      console.log(
        "-----@@----- Error at sending verify mail to user -----@@-----",
        err
      );
    else
      console.log(
        "-----@@----- Response at sending verify mail to user -----@@-----",
        res
      );
  });
  await User.onLoginDone(userData._id, loginToken, payload);
  return true;
};

/********** Logout users **********/
export const logoutUser = async payload => {
  return await User.logout(payload.userId, payload.token);
};

/***************updateDevTok******************/
export const updateDevTok = async req => {
  let payload = {};
  payload = req.body;
  payload.userId = req.user.userId;
  payload.token = req.user.token
  return await User.updateDeviceToken(payload.userId, payload.token, payload.deviceToken);
};


/********* get user list *********/
export const getUsers = async payload => {
  let query = { role: { $ne: ROLE.ADMIN }, email_verified: 1 };
  /* const radius = RADIUS.VALUE;
  const lng =  payload['location'].coordinates[0];
  const lat = payload['location'].coordinates[1];
  if(lat && lng){
     query = {...query, "location.coordinates":{
        $geoWithin: {
            $centerSphere: [
                [lng, lat],
                radius / 3963.2
            ]
        }
        }};
  } */
  if (payload['search']) {
    const regex = new RegExp(`${payload['search']}`, 'i');
    query = {
      ...query,
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { email: { $regex: regex } },
        { address: { $regex: regex } }
      ]
    };
  }

  if (payload['status']) {
    query = { ...query, status: payload['status'] };
  }
  if (payload['paymentInfo']) {
    query = { ...query, paymentInfo: payload['paymentInfo'] };
  }
  if (payload['role']) {
    query = { ...query, role: payload['role'] };
  }
  if (payload['dateRange']) {
    console.log(payload['dateRange']['fromDate']);
    query = { ...query, $and:[{createdAt:{$gte:new Date(payload['dateRange']['fromDate'])}},{createdAt:{$lte:new Date(payload['dateRange']['toDate'])}}] };
  }
  const data = await User.findUsersList(query, payload['page'], payload['speciality']);
  const totalRecords = await data.totalRecords;
  return {
    list: await data.list,
    total: totalRecords.length,
    limit: LIMIT.USERS
  };
 
};
/********** Send forgot password link in email ************/
export const forgotPasswordLink = async email => {
  const user = await User.findOneByCondition({ email });
  if (!user) throw new Error(Message.emailNotExists);
  let token = generateToken({
    when: new Date(),
    role: user.role,
    lastLogin: user.lastLogin,
    userId: user._id
  });
  const result = await Mail.htmlFromatWithObject(
    {
      data: {
        username: `${user.firstName} ${user.lastName}`, link: `${webUrl}/change-password/${token}`
      }
    },
    'forgot-password'
  );
  const emailData = {
    to: email,
    subject: Mail.subjects.forgotPassword,
    html: result.html
  };

  Mail.sendMail(emailData, function(err, res) {
    if (err) console.log('-----@@----- Error at sending verify mail to user -----@@-----', err);
    else console.log('-----@@----- Response at sending verify mail to user -----@@-----', res);
  });
  return true;
};
/********** Send forgot password link in email ************/
export const changePassword = async payload => {
  payload.password = encryptpassword(payload.password);
  return User.updateUser(payload);
};

/************ get user detail ***************/
export const userDetail = async (userId) => {
  return await User.findOneByCondition({ _id: userId });
};

export const getFilteredDoctors = async payload => {
  let query = { role: 2, status : 1, email_verified: 1, paymentInfo: 1};
  if (payload['name'] || payload['uid']) {
    const name = payload['name'] ? payload['name'].toLowerCase(): "";
    const uid = payload['uid'];
    query = {
      ...query,
      $or: [
        { firstName: name },
        { lastName: name },
        { uid: uid }
      ]
    };
  }
  const data = User.findByCondition(query);
  return {
    list: await data
      .select({ __v: 0, loginToken: 0, updatedAt: 0 })
      .sort([['createdAt', -1]]),
  };

}

export const activeDeactive = async payload => {
  const user = await User.updateUser(payload);
  if(user.status === 1 && user.role === 2){
    const result = await Mail.htmlFromatWithObject(
      {
        data: {
          username: `${user.firstName} ${user.lastName}`
        }
      },
      'license-approve'
    );
    const emailData = {
      to: user.email,
      subject: Mail.subjects.licenseApprove,
      html: result.html
    };
    Mail.sendMail(emailData, function(err, res) {
      if (err) console.log('-----@@----- Error at sending verify mail to user -----@@-----', err);
      else console.log('-----@@----- Response at sending verify mail to user -----@@-----', res);
    });
  }
  return user;
};

export const getLocationBaseDoctors = async payload => {
  const radius = RADIUS.VALUE;
  const lng =  payload['location'].coordinates[0];
  const lat = payload['location'].coordinates[1];
  let query = {};
  if(lat && lng){
     query = { email_verified: 1, paymentInfo: 1, role: 2, status : 1,  "location.coordinates":{
        $geoWithin: {
            $centerSphere: [
                [lng, lat],
                radius / 3963.2
            ]
        }
        }};
  }else{
    query = { email_verified: 1, paymentInfo: 1, role: 2, status : 1};
  }

  const data = User.findByCondition(query);
  return {
    list: await data
      .select({ __v: 0, loginToken: 0, updatedAt: 0 })
      .sort([['createdAt', -1]]),
  };

}

export const updateConnectWebhook = async (request) => {
  let event;

  try {
    event = request.body;
  } catch (err) {
    return err;
  }

  // Handle the event
  switch (event.type) {
    case "account.updated":
      const accountUpdated = event.data;
      console.log('.....',accountUpdated);
      const requirements =
        accountUpdated &&
        accountUpdated.object &&
        accountUpdated.object.requirements
          ? accountUpdated.object.requirements
          : {};
      const UserId = await User.findOneByCondition({ createdAccountNumber: accountUpdated.object.id });
      if (UserId && UserId._id) {
           const updateData = {
         // stripeAccountDetails: accountUpdated,
         // accountDisabledReason: requirements,
          userId : UserId._id
        };
        if (
          accountUpdated.object.charges_enabled &&
          accountUpdated.object.payouts_enabled
        ) {
          updateData["externalAccountCreated"] = 1;
          
        }
        const userData = await User.updateUser(updateData);

        let reqString = [];
        
        if (
          !accountUpdated.object.payouts_enabled &&
          (requirements.currently_due.length ||
            requirements.past_due.length ||
            requirements.pending_verification.length)
        ) {
          reqString.push("bank details");
        }
        if(!requirements.currently_due.length && !requirements.past_due.length && !requirements.pending_verification.length && !requirements.eventually_due.length){
          const userData = await User.updateUser({userId : UserId._id, paymentInfo : 1});
          const notificationObj = {
              targetId: UserId._id,
              message: 'Your profile is complelely approved by stripe, you can now continue with your appointments. Thanks!' ,
              type: "ConnectAccount Approval",
              data: {},
              notificationType: "Stripe Account",
              title: "Stripe Account Approval"
          };
          console.log('connectApproval...........',notificationObj);
          Notifications.SINGLE(notificationObj);
        }
        console.log('accountUpdated case',reqString);
        //Events.emit("details_pending", { data: reqString, id: UserId.userId });
      }
      break;
    case "capability.updated":
      const capabilityUpdated = event.data.object;
      if (capabilityUpdated.status == "active") {
        const UserId = await User.findOneByCondition({ createdAccountNumber: capabilityUpdated.account });
        if (UserId && UserId._id) {
          const userData = await User.updateUser({userId : UserId._id, externalAccountCreated : 1});
          let reqString = []; 
        }
      } else {
        const UserId = await User.findOneByCondition({ createdAccountNumber: capabilityUpdated.account });
        await User.updateUser({userId : UserId._id, accountDisabledReason: "capabilityUpdated"});
      }
      break;
    default:
      console.log("event.type ... ", event.type);

      return;
  }

  // Return a response to acknowledge receipt of the event
  // response.json({ received: true });
};
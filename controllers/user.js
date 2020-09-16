/*
 * @file: user.js
 * @description: It Contain function layer for user controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as Mail from '../utilities/mail';
import { checkTokenInParams, readFile } from '../utilities/universal';
import * as userService from '../services/user';
import { ROLE } from '../utilities/constants'
import Message from '../utilities/messages';
import Events from "../utilities/event";



/****************  register new user  ***********/
export const registerUser = async (req, res, next) => {
  const payload = req;
  try {
    const data = await userService.save(payload);
    res.status(200).json(successAction(data, Message.userAdded));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/****************  Verification of mobile otp ***********/
export const otpVerification = async(req, res, next)=> {
  const payload = req;
  try {
    const data = await userService.otpVerification(payload);
    if(data)
      res.status(200).json(successAction([], Message.otpVerifySuccess));
    else
      res.status(400).json(successAction([], Message.otpNotMatched));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};



/**************** Login user ***********/
export const login = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await userService.onLogin(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Chatbot Login user ***********/
export const chatbot_login = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await userService.onChatbotLogin(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    if(error.message == "accountNotActivated"){
      res.status(400).json(failAction(Message.accountNotActivated, 201));
    }
    else if(error.message == "doctorProfileVerificationPending"){
      res.status(400).json(failAction(Message.doctorProfileVerificationPending, 203));
    }

    else if(error.message == "aggreementNotVerified"){
      res.status(400).json(failAction("aggreementNotVerified", 204));
    }

    else if(error.message == "paymentNotEntered"){
      res.status(400).json(failAction("paymentNotEntered", 205));
    }

    else{
      res.status(400).json(failAction(error.message));
    }
    
  }
};

/**************** Logout user ***********/
export const logout = async (req, res, next) => {
  const payload = req.user;
  try {
    await userService.logoutUser(payload);
    res.status(200).json(successAction(null, Message.success));
  } catch (error) {
    console.log('else');
    res.status(400).json(failAction(error.message));
  }
};

/**************** Logout user ***********/
export const updateDeviceToken = async (req, res, next) => {
  const payload = req;
  try {
    await userService.updateDevTok(payload);
    res.status(200).json(successAction(null, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** update user info ***********/
export const updateUser = async (req, res, next) => {
  const payload = req.body;
  payload.userId = req.user.userId;
  payload.files = req.files;
  payload.appUrl = `${req.protocol}://${req.headers.host}`;
  try {
    const data = await userService.updateUserInfo(payload);
    res.status(200).json(successAction(data, Message.userUpdate));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** update user info ***********/
export const updateKYC = async (req, res, next) => {
  const payload = req.body;
  payload.files = req.files; 
  payload.userId = req.user.userId;
  payload.appUrl = `${req.protocol}://${req.headers.host}`;
  try {
    const data = await userService.updateUserKYC(payload);
    res.status(200).json(successAction(data, Message.userUpdate));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** update user info ***********/
export const getList = async (req, res, next) => {
  try {
    const data = await userService.getUsers(req.body);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** Forgot password ***********/
export const forgotPassword = async (req, res, next) => {
  const payload = req.body;
  try {
    await userService.forgotPasswordLink(payload.email);
    res.status(200).json(successAction(null, Message.forgotPasswordEmail));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Update password ***********/
export const updatePassword = async (req, res, next) => {
  const payload = req.body;
  payload.userId = req.user.userId;
  try {
    await userService.changePassword(payload);
    res.status(200).json(successAction(null, Message.passwordUpdated));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/********* Get User Detail **************/
export const getDetail = async (req, res, next) => {
  try {
    const data = await userService.userDetail(req.user.userId);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

exports.confirmationPost = async (req, res, next) => {
  const payload = {};
  payload.userId = req.user.userId;
  var verifymessage = "";
  if(req.user.role == 2){
    payload.status = 0;
    payload.email_verified = 1;
    verifymessage = Message.doctorProfileVerificationIntimation;
  }else{
    verifymessage = Message.emailLinkVerified;
    payload.status = 1;
    payload.email_verified = 1;
  }
  try {
    await userService.updateUserInfo(payload);
    res.status(200).send(verifymessage);
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**
* POST /confirmation
*/
exports.loginconfirmationPost = async (req, res, next) => {
  const payload = {};
  payload.email = req.user.userEmail;
  try {
    const data = await userService.onChatbotLoginVerificationDone(payload);
    Events.emit("fireLoggedInEvent", { userData: data});
    var loginConfirmMessage = Message.loginConfirmMessage;
    res.status(200).send(loginConfirmMessage);
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};



/*
 * @file: chatbot.js
 * @description: It Contain function layer for chatbot controller.
 * @author: Shubham
 */
import config1 from 'config';
import { successAction, failAction } from '../utilities/response';
import { encryptDataApi , decryptDataApi  } from '../utilities/universal';
import dialogflow from 'dialogflow'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import moment from 'moment-timezone'
import dotenv from 'dotenv'
const { webUrl } = config1.get('app');
import CryptoJS from "crypto-js";
import { encrytedStr } from '../utilities/constants';
dotenv.config();

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string}  The project to be used
 */
// Create a new session
const projectId = 'bookzdoctor-ixchxq'
let config = {
  credentials: {
    "type": "service_account",
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key,
    "client_email": "dialogflow-emoymq@bookzdoctor-ixchxq.iam.gserviceaccount.com",
    "client_id": process.env.client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-emoymq%40bookzdoctor-ixchxq.iam.gserviceaccount.com"
  }
}
const sessionClient = new dialogflow.SessionsClient(config);
// const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const call = async (data) => {

  try{
    if (data.token){
      const dataToEncrypt = JSON.stringify(data.text);
      const encPassword = encrytedStr.secretkey;
      const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt.trim(), encPassword.trim()).toString();
      const result= await axios({
        url: `${webUrl}/api/v1/${data.route_name}`,
        method: 'POST',
        data:  {'encrytData':encryptedData},
        headers: {'Authorization':data.token},
      })
      var bytes  = CryptoJS.AES.decrypt(result.data.encrytData, encrytedStr.secretkey);
      var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      let responseData = {};
      responseData.data = originalText;

      return responseData;
    }
    else{

          const dataToEncrypt = JSON.stringify(data.text);
          const encPassword = encrytedStr.secretkey;
          const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt.trim(), encPassword.trim()).toString();
         // console.log(data);
          //console.log(webUrl);
          const result = await axios({    
              url: `${webUrl}/api/v1/${data.route_name}`,
              method: 'POST',
              data:  {'encrytData':encryptedData}
            });

          //console.log('000000000000',result);
          var bytes  = CryptoJS.AES.decrypt(result.data.encrytData, encrytedStr.secretkey);
          var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          let responseData = {};
          responseData.data = originalText;
          console.log('"""""""""""""',responseData);
          return responseData;
    }
 } 
catch (error) {

  		  var bytes  = CryptoJS.AES.decrypt(error.response.data.encrytData, encrytedStr.secretkey);
          var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          let responseData = {};
          responseData.data = originalText;
          console.log("catchhhhh",responseData);
          return responseData;
}
}

const call_chatbot = async (data) => {
  const request = {
    session: `projects/${projectId}/agent/sessions/${data.sessionId}`,//sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: data.message,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
    queryParams:{contexts:data.context}//"last received context from dialogflow"
  };
      // Send request and log result
const responses = await sessionClient.detectIntent(request);

const result = responses[0].queryResult;
//let output={'text':result.fulfillmentText,'sessionId':data.sessionId,'context':result.outputContexts,'userdata':data.userdata,'doctordata':data.doctordata}
let output={'text':result.fulfillmentText,'sessionId':data.sessionId,'context':result.outputContexts,'userdata':data.userdata,'doctordata':data.doctordata,'bookingdata':data.bookingdata}
return output
}

//Bot chat API
export const chatbotDetail = async (req, res, next) => {
    const payload = req.body.data;
    if (req.body.message=="start" || req.body.message=="start again"){
      payload.sessionId=''
      delete payload.context
    }
    try {
      let sessionId = null;
      if (!payload.sessionId || payload.sessionId === '') {
        // A unique identifier for the given session
        sessionId = uuidv4()
      } else {
        sessionId = payload.sessionId;
      }
      const context=payload.context?payload.context:null
      // The text query request
    const request = {
        session: `projects/${projectId}/agent/sessions/${sessionId}`,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: req.body.message,//payload.message,//
            // The language used by the client (en-US)
            languageCode: 'en-US',
          },
        },
        queryParams:{contexts:context}//"last received context from dialogflow"
      };
          // Send request and log result
    const responses = await sessionClient.detectIntent(request);
  
    const result = responses[0].queryResult;
    let parameters = result.parameters.fields
    let text={'text':result.fulfillmentText,'sessionId':sessionId,'context':result.outputContexts,'userdata':payload.userdata?payload.userdata:null,'doctordata':payload.doctordata?payload.doctordata:null,'bookingdata':payload.bookingdata?payload.bookingdata:null}
    if (result.intent) {
      let intent = result.intent
      console.log(`  Intent: ${result.intent.displayName}`); 
 
      if (intent && intent.displayName == "VerifyLogin") {
        // call db and check
        if (parameters.email) {
          let response= await call({'route_name':'user/chatbot_login',text:{'email':parameters.email.stringValue,'deviceToken':payload.deviceToken}})
          console.log('response', response.data);
          if (response.data.statusCode==200){
          	console.log('i am unnnnnnnn');
            text['email']=parameters.email.stringValue
            text['socketId']=1
          }
      else if (response.data.statusCode==201){
        let call_chatbotdata=text
        call_chatbotdata['message']="verify_email data"
        let response2 = await call_chatbot(call_chatbotdata)
        text=response2
      }
      else if (response.data.statusCode==203){
        let call_chatbotdata=text
        call_chatbotdata['message']="profile_inactive"
        let response2 = await call_chatbot(call_chatbotdata)
        text=response2
      }
      else if (response.data.statusCode==400){
        let call_chatbotdata=text
        call_chatbotdata['message']="incorrect data"
        let response2 = await call_chatbot(call_chatbotdata)//{'message':'incorrect data','sessionId':sessionId,'context':result.outputContexts})
        text=response2
      }
        }
      }
      else if(intent && intent.displayName == "suggest doctors"){
        let location=payload.location
        let response=await call({'route_name':'searchDoctorsByLocation',text:{'symptom':result.queryText,'location':{"coordinates":location}}})//.then(response=>{
            console.log(':::::::::::::::::::',response);
            if (response.data.statusCode==200 && (response.data.data.list.length>0)){
              let details=''
              let range=(response.data.data.list).length>3?3:(response.data.data.list).length
                for (let i=0;i<range;i++){
                  details+=`\nDr.${response.data.data.list[i].firstName[0].toUpperCase()}${response.data.data.list[i].firstName.slice(1)} ${response.data.data.list[i].lastName[0].toUpperCase()}${response.data.data.list[i].lastName.slice(1)} ID ${response.data.data.list[i].uid} \n ${response.data.data.list[i].speciality[0].speclId.title}\nRate:${response.data.data.list[i].priceBracket.simple}-${response.data.data.list[i].priceBracket.complex}$`
                }
                text['text']=text['text'].replace("<doctordata>",details)
            }
            else{
              let call_chatbotdata=text
              call_chatbotdata["message"]= "unavailable"
              let response2 = await call_chatbot(call_chatbotdata)
                text=response2
            }
      }
      else if(intent && intent.displayName == "suggest doctors - verify"){
        let query_field=''
        if (parameters.doctor_Id && parameters.doctor_Id.numberValue)
          query_field={'uid':parameters.doctor_Id.numberValue}
        else if(parameters.doctor_name.structValue) 
        {
          let dr_name=parameters.doctor_name.structValue.fields.name_id.structValue?parameters.doctor_name.structValue.fields.name_id.structValue.fields.name.stringValue:parameters.doctor_name.structValue.fields.name_id.stringValue
        query_field={'name':dr_name}
      }
        let response=await call({'route_name':'doctorDetail',text:query_field})
          
          if (response.data.statusCode==200 && (response.data.data.list).length > 0){
            if ((response.data.data.list).length > 1){
              let call_chatbotdata=text
              call_chatbotdata['message']="select_from_multiple"
              let response2 = await call_chatbot(call_chatbotdata)
                text=response2
                let details=''
                let range=(response.data.data.list).length>3?3:(response.data.data.list).length
                for (let i=0;i<range;i++){
                    details+=`\nDr.${response.data.data.list[i].firstName[0].toUpperCase()}${response.data.data.list[i].firstName.slice(1)} ${response.data.data.list[i].lastName[0].toUpperCase()}${response.data.data.list[i].lastName.slice(1)} ID ${response.data.data.list[i].uid} \n ${response.data.data.list[i].speciality[0].speclId.title}\nRate:${response.data.data.list[i].priceBracket.simple}-${response.data.data.list[i].priceBracket.complex}$`
                }
                text['text']=text['text'].replace("<doctordata>",details)
            }
            else{
              let dr_data=response.data.data.list[0]
              text['text']=text['text'].replace("<doctor>",`${dr_data.firstName[0].toUpperCase()}${dr_data.firstName.slice(1)} ${dr_data.lastName[0].toUpperCase()}${dr_data.lastName.slice(1)} ID ${dr_data.uid} \n${dr_data.speciality[0].speclId.title}\nRate:${dr_data.priceBracket.simple}-${dr_data.priceBracket.complex}$`)
              text['doctordata']=dr_data
            }
          }
          else if (response.data.statusCode!=200 || (response.data.data.list).length < 1){
            let call_chatbotdata=text
        call_chatbotdata['message']="invalid doctor deatils"
        let response2 = await call_chatbot(call_chatbotdata)
            text=response2
          }          
    }
    else if (intent && intent.displayName=="suggest doctors - verify - time_slot"){
      // time=''parameters.time.stringValue
      text['text']=text['text'].replace('<dr name>',`${payload.doctordata.firstName[0].toUpperCase()}${payload.doctordata.firstName.slice(1)} ${payload.doctordata.lastName[0].toUpperCase()}${payload.doctordata.lastName.slice(1)}`)
      text['text']=text['text'].replace('<time>',moment.tz(result.queryText,payload.timezone).format('MMM Do YYYY [at] h:mm A'))//parameters.time)
      text['doctordata']['time']=result.queryText
    }

    else if (intent && intent.displayName=="suggest doctors - verify - yes"){
      if (payload.userdata && payload.userdata.paymentInfo ==0){
        let call_chatbotdata=text
        call_chatbotdata['message']="add_payment info"
        let response2 = await call_chatbot(call_chatbotdata)
            text=response2
      }
      else{
      let header=payload.userdata.loginToken
      let email=payload.userdata.email
      let doctor_id=payload.doctordata.uid
      let booking_time=payload.doctordata.time
      let response=await call({'route_name':'Appointment/addBooking','token':header,text:{"patientEmailId":email,"appointment_slot":booking_time,"doctorUId":doctor_id}})
      if (response.data.statusCode==200){
        let data=response.data.data
        delete data.patientId
        delete data.createdAt
        delete data.updatedAt
        text['bookingdata']=data
        text['text']=text['text'].replace('<dr name>',`${data.doctorId.firstName[0].toUpperCase()}${data.doctorId.firstName.slice(1)} ${data.doctorId.lastName[0].toUpperCase()}${data.doctorId.lastName.slice(1)}`)
        text['text']=text['text'].replace('<time>',data.doctorId.responseTime)
        text['doctordata']=null
      }
     }
    } 
    else if (intent && intent.displayName=="re-confirm booking"){
      if(payload.doctordata)
      text['text']=text['text'].replace('<dr name>',`${payload.doctordata.firstName[0].toUpperCase()}${payload.doctordata.firstName.slice(1)} ${payload.doctordata.lastName[0].toUpperCase()}${payload.doctordata.lastName.slice(1)}`)
    }
    else if (intent && intent.displayName=="cancel-appointment"){
      let header=payload.userdata.loginToken
      // web api call
      let Booking_Id=payload.bookingdata._id
      //let response=await call({'route_name':'Appointment/cancelAppointByPatient','token':header,'appointmentId':Booking_Id,'status':3})
      let response=await call({'route_name':'Appointment/cancelAppointByPatient','token':header,text:{'appointmentId':Booking_Id,'status':3}})
      if(payload.bookingdata)
      text['text']=text['text'].replace('<dr name>',`${payload.bookingdata.doctorId.firstName[0].toUpperCase()}${payload.bookingdata.doctorId.firstName.slice(1)} ${payload.bookingdata.doctorId.lastName[0].toUpperCase()}${payload.bookingdata.doctorId.lastName.slice(1)}`)
    delete text['context']
    delete text['bookingdata']
    }
    else if (intent && intent.displayName=="ask.payment"){
      let case_type=payload.case
      let amount=payload.amount
      text['text']=text['text'].replace('<dr_name>',`${payload.bookingdata.doctorId.firstName[0].toUpperCase()}${payload.bookingdata.doctorId.firstName.slice(1)} ${payload.bookingdata.doctorId.lastName[0].toUpperCase()}${payload.bookingdata.doctorId.lastName.slice(1)}`)
      text['text']=text['text'].replace('<casetype>',case_type)
      text['text']=text['text'].replace('<amount>',amount)
      text['bookingdata']=payload.bookingdata
      text['bookingdata']['amount']=amount
      text['bookingdata']['case_type']=case_type
    }
    else if (intent && intent.displayName=="ask.feedback"){
      //console.log('payForAppointmentpayload',payload);
      let case_type=payload.bookingdata.case_type
      let amount=payload.bookingdata.amount
      let Booking_Id=payload.bookingdata._id
      let response=await call({'route_name':'Appointment/payForAppointment',text:{"price_bracket_case":case_type,"amount":amount,'appointmentId':Booking_Id}})
    if (response.data.statusCode!=200){
      let call_chatbotdata=text
        call_chatbotdata['message']="payment failed"
        let response2 = await call_chatbot(call_chatbotdata);
        text=response2
        text['text']=text['text'].replace('<msg>',`${response.data.message}`)
    }else
    {
    text['bookingdata']={"_id":payload.bookingdata._id,"appointment_id":payload.bookingdata.appointment_id}
    }
    }
    else if (intent && intent.displayName=="ask.feedback - rating"){
      let feedback=parameters.feedback && parameters.feedback.numberValue?parameters.feedback.numberValue:0
      let Booking_Id=payload.bookingdata._id
      let response=await call({'route_name':'Appointment/feedback',text:{"feedback":feedback,'appointmentId':Booking_Id}})
    }
    else if (intent && intent.displayName=="Welcome Bot" || intent && intent.displayName=="Welcome.again"){
      if (payload.infermedica){
        text['text']=text['text'].replace('<summary>',`${payload.infermedica}`)
        text['infermedica']=true
      }
      else{
        text['infermedica']=false
        text['context']=''//payload['context']
        text['sessionId']=''//payload['sessionId']
      }
    }
    }
      else {
        console.log(`No intent matched.`);
      }
      res.status(200).json(successAction(text, ''));
    } catch (error) {
      res.status(400).json(failAction(error.message));
    }
  };

 

/*
 * @file: universal.js
 * @description: It Contain function layer for all commom function.
 * @author: Pankaj Pandey
 */
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../collections/user';
import { failAction } from './response';
import Message from './messages';
import path from 'path';
import fs from 'fs';
import Jimp from 'jimp';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import CryptoJS from "crypto-js";
import { encrytedStr } from './constants';
dotenv.config();

const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.accessKeyS3, //"AKIAIB2QB2MAU2JKGFRA",
    secretAccessKey: process.env.secretKeyS3 //"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",
});

const { jwtAlgo, jwtKey } = config.get('app');

export const encryptpassword = password => {
  return md5(password);
};


/*********  Generate random strings *********/
export const generateRandom = (length = 32, alphanumeric = true) => {
  let data = '',
    keys = '';

  if (alphanumeric) {
    keys = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  } else {
    keys = '0123456789';
  }
  for (let i = 0; i < length; i++) {
    data += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return data;
};
/*********** Generate JWT token *************/
export const generateToken = data =>
  jwt.sign(data, jwtKey, { algorithm: jwtAlgo, expiresIn: '90d' });

/*********** Decode JWT token *************/
export const decodeToken = token => jwt.verify(token, jwtKey);

/*********** Verify token *************/
export const checkToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return res.status(401).json(failAction(Message.unauthorizedUser, 401));
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtKey);
  } catch (err) {
    return res.status(401).json(failAction(Message.tokenExpired, 401));
  }
  const user = await User.checkToken(token);
  if (user) {
    req.user = { ...decoded, token };
    next();
  } else {
    res.status(401).json(failAction(Message.unauthorizedUser, 401));
  }
};


export const checkTokenInParams = async (req, res, next) => {
  const token = req.params.token;
  //console.log('url => ', req.originalUrl);
  if (!token)
    return res.status(401).json(failAction(Message.unauthorizedUser, 401));
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtKey);
  } catch (err) {
    return res.status(401).json(failAction(Message.tokenExpired, 401));
  }
  const user = await User.checkToken(token);
  if (user) {
    req.user = { ...decoded, token };
    next();
  } else {
    res.status(401).json(failAction(Message.unauthorizedUser, 401));
  }
};

/********* Generate slug *********/
export const generateSlug = text => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};
/********* Get time ago in string format *********/
export const timeAgo = time => {
  var seconds = Math.floor((new Date() - new Date(time)) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    let text = interval > 1 ? ' years' : ' year';
    return interval + text + ' ago';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    let text = interval > 1 ? ' months' : ' month';
    return interval + text + ' ago';
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    let text = interval > 1 ? ' days' : ' day';
    return interval + text + ' ago';
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    let text = interval > 1 ? ' hours' : ' hour';
    return interval + text + ' ago';
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    let text = interval > 1 ? ' minutes' : ' minute';
    return interval + text + ' ago';
  }
  if (seconds === 0 || seconds === 1) {
    return 'Now';
  }
  return Math.floor(seconds) + ' seconds ago';
};

export const decryptDataApi = async (req, res, next) => {

    var bytes = CryptoJS.AES.decrypt(req.body.encrytData, encrytedStr.secretkey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    req.body = decryptedData;
   // console.log(req.body);
    return next();
};

export const generateOTP = async (digits) => { 
  var numbers = '0123456789'; 
  let OTP = ''; 
  for (let i = 0; i <= digits; i++ ) { 
      OTP += numbers[Math.floor(Math.random() * 10)]; 
  } 
  return OTP; 
}

export const decryptDataApiChatbot = async (req, res, next) => {
    const decPassword = encrytedStr.secretkey;
    const testvar = "U2FsdGVkX1/CNh/W0teBcmpENq8dqPT2ntbnjrRwReNqq+DYz7U8YQJNC51Oa4Q/cqI6cYMXU3niMFMnBU0RkVhipOZBSVykMOYDO7SyKx5olIzOgqTaH0eP9ko5X5AvmmnjDalKgq4StBTgDCtxGQ==";
    const decryptedOutput = CryptoJS.AES.decrypt(eq.body.encrytData, decPassword.trim()).toString(CryptoJS.enc.Utf8);
    response = JSON.parse(decryptedOutput);
    return response;
};

export const encryptDataApi = async (req, res, next) => {
        const dataToEncrypt = JSON.stringify(req);
        const encPassword = encrytedStr.secretkey;
        const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt.trim(), encPassword.trim()).toString();
        const returndata = {"encrytData": encryptedData};
        return returndata;
};

/*
 * @file: index.js
 * @description: It's combine all user routers.
 * @author: Pankaj Pandey
 */


import login from './login';
import register from './register';
import otpVerify from './otp-verify';
import Chatbotlogin from './Chatbotlogin';
import logout from './logout';
import updateUser from './update-user';
import getUsers from './get-list';
import forgotPassword from './forgot-passsword';
import updatePassword from './update-password';
import detail from './detail';

import updateDeviceToken from './updateDeviceToken'; 

export default [

  login,
  register,
  otpVerify,
  Chatbotlogin,
  logout,
  updateUser,
  getUsers,
  forgotPassword,
  updatePassword,
  detail,
  updateDeviceToken
];

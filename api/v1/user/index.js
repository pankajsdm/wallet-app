/*
 * @file: index.js
 * @description: It's combine all user routers.
 * @author: Pankaj Pandey
 */


import createUser from './createUser';
import login from './login';
import register from './register';
import otpVerify from './otp-verify';
import Chatbotlogin from './Chatbotlogin';
import logout from './logout';
import updateAdmin from './update-admin';
import updateUser from './update-user';
import updateKYC from './kyc';
import getUsers from './get-list';
import forgotPassword from './forgot-passsword';
import updatePassword from './update-password';
import detail from './detail';
import dashboard from './dashboard';
import deleteUser from './delete';

import updateDeviceToken from './updateDeviceToken'; 

export default [
  createUser,
  login,
  register,
  otpVerify,
  Chatbotlogin,
  updateAdmin,
  updateUser,
  updateKYC,
  getUsers,
  forgotPassword,
  updatePassword,
  detail,
  dashboard,
  updateDeviceToken,
  deleteUser,
  logout,
];


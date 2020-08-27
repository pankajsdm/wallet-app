/*
 * @file: index.js
 * @description: It Contain function layer for user collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';
import { LIMIT, ROLE } from '../../utilities/constants';
class UserClass {
  static saveUser(payload) {
    return this(payload).save();
  }
  static checkEmail(email) {
    return this.findOne({ email });
  }
  static checkUid(uid) {
    return this.findOne({ uid }, {loginToken : 0, speciality: 0, mobilePhone: 0, lastLogin: 0});
  }
  static findDetail(condition) {
    return this.aggregate([ 
        {$lookup: {from: "appointments", localField: "_id",foreignField: "doctorId", as: "feedbackdata"}},
        {$lookup: {from: "specialities", localField: "speciality.speclId",foreignField: "_id", as: "specialityInfo"}},
        {$match:  {_id: mongoose.Types.ObjectId(condition._id)}},
        {$project : {"firstName": 1, "lastName": 1, "priceBracket": 1, "doctordegree": 1, "address": 1, "location": 1, "description": 1, "mobilePhone": 1, "profileVisibility": 1, "doctorlicense": 1, "licenseName": 1, "licenseExpiry": 1, "licenseCountry": 1, "profileImage": 1, "uid": 1, "email": 1, "status": 1, "speciality": "$specialityInfo", "responseTime": 1, "night_shift": 1, "createdAt": 1, "feedbackAvg" : {$ifNull: [ {$avg: "$feedbackdata.feedback"},0]}}}
    ])
  }

  static findPatientDetail(userId){
    return this.findOne({ _id: userId}, {loginToken : 0, speciality: 0, lastLogin: 0, priceBracket: 0, socketId: 0, responseTime: 0, licenseExpiry: 0, licenseCountry: 0, licenseName: 0, doctorlicense: 0, createdAccountNumber: 0});
  }

  static findOneByCondition(condition) {
    return this.findOne(condition);
  }

  static findByCondition(condition) {
    return this.find({ role: { $ne: 1 }, ...condition }).populate('speciality.speclId');
  }

  static checkUsername(username) {
    return this.findOne({ username });
  }

  static checkToken(token) {
    return this.findOne({ 'loginToken.token': token });
  }

  static onLoginDone(userId, loginToken, payload = {}) {
    let updateData = {
      $push: {
        loginToken: {
          token: loginToken,
          deviceToken: payload['deviceToken'],
          deviceType: payload['deviceType']
        }
      },
      $set: {
        lastLogin: new Date()
      }
    };
    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }
  
  static updateUser(payload) {
    let updateData = {
      $set: {
        ...payload
      }
    };
    return this.findByIdAndUpdate(payload.userId, updateData, { new: true });
  } 

  static logout(userId, token) {
    let updateData = {
      $pull: { loginToken: { token } }
    };
    return this.findByIdAndUpdate(userId, updateData);
  }

  static updateDeviceToken(userId, token, deviceToken) {
    let updateData = {
      $pull: { loginToken: { token } }
    };
    return this.updateOne({"_id": userId, "loginToken.token": token}, { $set: { "loginToken.$.deviceToken" : deviceToken } });
  }
  
  static findUsersList(condition, pageNo, specialityId) {
    if(specialityId){
      condition = {...condition, "speciality.speclId" : mongoose.Types.ObjectId(specialityId)}; 
    }
     const query = [ 
        {$lookup: {from: "appointments", localField: "_id",foreignField: "doctorId", as: "feedbackdata"}},
        {$lookup: {from: "specialities", localField: "speciality.speclId",foreignField: "_id", as: "specialityInfo"}},
        {$match: condition},
        {$sort: { createdAt: -1 } },
        {$project : {"firstName": 1, "lastName": 1, "priceBracket": 1, "doctordegree": 1, "address": 1, "location": 1, "description": 1, "mobilePhone": 1, "profileVisibility": 1, "doctorlicense": 1, "licenseName": 1, "licenseExpiry": 1, "licenseCountry": 1, "profileImage": 1, "uid": 1, "email": 1, "status": 1, "speciality": "$specialityInfo", "responseTime": 1,  "night_shift": 1, "createdAt": 1, "feedbackAvg" : {$ifNull: [ {$avg: "$feedbackdata.feedback"},0]}}}
    ]
    const pagination = [
      { $skip: pageNo ? (pageNo - 1) * LIMIT.USERS : 0 },
      { $limit: LIMIT.USERS }
    ];

    const aggregateQuery = this.aggregate([...query, ...pagination]);
    return {
      list: aggregateQuery,
      totalRecords: this.aggregate([...query])
    };
  }
}

dbSchema.loadClass(UserClass);

export default mongoose.model('User', dbSchema);

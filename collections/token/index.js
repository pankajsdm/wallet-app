/*
 * @file: index.js
 * @description: It contain function layer for token collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class TokenClass {

  static saveToken(userId, loginToken, payload = {}) {
    let tokenObject = {
        userId: userId,
        token: loginToken,
        deviceToken: payload['deviceToken'],
        deviceType: payload['deviceType']
    };
    return this(tokenObject).save();
  }

  static checkToken(token) {
    return this.findOne({ 'token': token });
  }

  
  static findOneByCondition(condition) {
    return this.findOne(condition);
  }

}

dbSchema.loadClass(TokenClass);

export default mongoose.model('Token', dbSchema);

/*
 * @file: index.js
 * @description: It Contain function layer for user collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class ServiceClass {

  static add(payload) {
    return this(payload).save();
  }
  static findOneByCondition(condition) {
    return this.findOne({ ...condition, status: true });
  }
  static findByCondition(condition) {
    return this.find({ status: true, ...condition });
  }

  static addProvider(payload) {
    let updateData = {
      $push: {
        providers: payload.providers
      }
    };
    return this.updateOne({_id: payload.serviceId}, updateData);
  } 

}

dbSchema.loadClass(ServiceClass);

export default mongoose.model('Service', dbSchema);

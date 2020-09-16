/*
 * @file: index.js
 * @description: It Contain function layer for user collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class LocationClass {

  static add(payload) {
    return this(payload).save();
  }
  
  static findOneByCondition(condition) {
    return this.findOne({ ...condition, status: true });
  }
  
  static findAll(condition) {
    return this.find(condition);
  }

}

dbSchema.loadClass(LocationClass);

export default mongoose.model('Location', dbSchema);

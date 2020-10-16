/*
 * @file: index.js
 * @description: It Contain function layer for redeem collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class RedeemedClass {

  static add(payload) {
    return this(payload).save();
  }

  static findOneByCondition(condition) {
    return this.findOne({ ...condition, status: true });
  }
  

}

dbSchema.loadClass(RedeemedClass);

export default mongoose.model('Redeemed', dbSchema);

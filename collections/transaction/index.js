/*
 * @file: index.js
 * @description: It Contain function layer for transaction collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class TransactionClass {

  static add(payload) {
    return this(payload).save();
  }

  static findOneByCondition(condition) {
    return this.findOne({ ...condition, status: true });
  }
  
  static findByCondition(condition) {
    return this.find({ status: true, ...condition });
  }

}

dbSchema.loadClass(TransactionClass);

export default mongoose.model('Transaction', dbSchema);

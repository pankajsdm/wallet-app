/*
 * @file: index.js
 * @description: It contain function layer for commission collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class CommissionClass {

  static add(payload) {
    return this(payload).save();
  }

  static findOneByCondition(condition) {
    return this.findOne({ ...condition, status: true });
  }
  
  static findByCondition(condition) {
    return this.find({ status: true, ...condition });
  }

  static getCommissionList(condition, pageNo, limit) {
    const query = [ 
       {$match: condition},
       {$sort: { createdAt: -1 } },
   ]
   const pagination = [
     { $skip: pageNo ? (pageNo - 1) * limit : 0 },
     { $limit: limit }
   ];

   const aggregateQuery = this.aggregate([...query, ...pagination]);
   return {
     list: aggregateQuery,
     totalRecords: this.aggregate([...query])
   };
 }

 static delete(condition) {
  return this.remove({ ...condition});
} 

}

dbSchema.loadClass(CommissionClass);

export default mongoose.model('Commission', dbSchema);

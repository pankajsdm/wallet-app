/*
 * @file: index.js
 * @description: It contain function layer for report collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class ReportClass {

  static add(payload) {
    return this(payload).save();
  }

  static findOneByCondition(condition) {
    return this.findOne({ ...condition, status: true });
  }


  static getReportList(condition, pageNo, limit) {
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

  static updateById(payload) {
    let updateData = {
      $set: {
        ...payload
      }
    };
    return this.findByIdAndUpdate(payload._id, updateData, { new: true });
  }

}

dbSchema.loadClass(ReportClass);
export default mongoose.model('Report', dbSchema);

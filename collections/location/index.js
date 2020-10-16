/*
 * @file: index.js
 * @description: It Contain function layer for location collection.
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

  static getLocationList(condition, pageNo, limit) {
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

  static delete(condition) {
    return this.remove({ ...condition});
  } 


}


dbSchema.loadClass(LocationClass);
dbSchema.index({ location: "2dsphere"});
dbSchema.index( 
  { title: "text", description:"text", "translation.title": "text", "translation.description": "text" },
  { default_language: "turkish" }
)
export default mongoose.model('Location', dbSchema);

/*
 * @file: index.js
 * @description: It Contain function layer for provider collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class ProviderClass {

  static getProviderList(condition, pageNo, limit) {

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

  static add(payload) {
    return this(payload).save();
  }

  static updateById(payload) {
    let updateData = {
      $set: {...payload }
    };
    return this.findByIdAndUpdate(payload._id, updateData, { new: true });
  } 

  static addPlan(payload) {
    let updateData = {
      $push: {
        plans: payload
      }
    };
    return this.updateOne({_id: payload.providerId}, updateData);
  }


  static updatePlan(payload) {
    const set = {};
    const cond = { 
      _id: mongoose.Types.ObjectId(payload.providerId),
      "plans._id": mongoose.Types.ObjectId(payload._id) 
    }
    
    let updateData = {
      $set: {  
        "plans.$.title": payload.title,
        "plans.$.code": payload.code,
        "plans.$.price": payload.price,
        "plans.$.description": payload.description,
        "plans.$.status": payload.status,
      }
    };
    return this.updateOne(cond, updateData, { new: true });
  }

  static findOneByCondition(condition) {
    return this.findOne({ ...condition, status: true });
  }

  static findPlanById(payload) {
    const match = { _id : mongoose.Types.ObjectId(payload.providerId) };
    const filteredProject = { 
      $filter: {
        input: '$plans',
        as: 'plans',
        cond: { $eq: ['$$plans._id', mongoose.Types.ObjectId(payload._id)]}
      }
    };

    const queryCondition = [
      { 
        $match: match 
      },
      { 
        $project: { plans: filteredProject}
      }
    ]
    return this.aggregate(queryCondition);
  }
  
  static findByCondition(condition) {
    return this.find({ status: true, ...condition });
  }

  static delete(condition) {
    return this.remove({ ...condition,});
  } 

  static deletePlan(condition) {
    const cond = { _id: condition.providerId }
    const pullingObject = { $pull: { plans: { _id: condition._id } } } 
    return this.updateOne(cond, pullingObject);
  } 

}

dbSchema.loadClass(ProviderClass);

export default mongoose.model('Provider', dbSchema);

/*
 * @file: page.js
 * @description: It contain function layer for service controller.
 * @author: Pankaj Pandey
 */


import User from '../collections/user';
import Service from '../collections/service';
import Provider from '../collections/provider';
import Message from '../utilities/messages';
import { LIMIT } from '../utilities/constants';
import { generateSlug } from '../utilities/universal';
import mongoose from 'mongoose';

/********* Add provider *********/
export const add = async payload => {
  payload.slug =  generateSlug(payload.title);
  if (await Provider.findOneByCondition({ slug: payload.slug}))
    throw new Error(Message.dataExist('provider'));

  return await Provider.add(payload); 
};

/********** Update  provider **********/
export const update = async payload => {
  payload.slug =  generateSlug(payload.title);
  if (await Provider.findOneByCondition({ _id: { $ne: payload._id }, slug: payload.slug}))
    throw new Error(Message.dataExist('provider'));

  return await Provider.updateById(payload);
};

/********** Delete provider **********/
export const deleteProvider = async payload => {
  return await Provider.delete({_id: payload._id});
};


/********* get provider by Id *********/
export const getProviderById = async payload => {
  const conditionObj = {_id : payload._id };
  return await Provider.findOneByCondition(conditionObj);
};


/********* get provider by Id *********/
export const getlistProviderPlan = async payload => {
  const conditionObj = { serviceId : payload.serviceId };
  return await Provider.findOneByCondition(conditionObj);
};



/********* get provider by Id *********/
export const getProviderPlanById = async payload => {
  return await Provider.findPlanById(payload);
};

/********* get all provider list *********/
export const getAll = async payload => {
  let query = { status: 1, serviceId: mongoose.Types.ObjectId(payload.serviceId)};
  if (payload.search) {
    const regex = new RegExp(`${payload.search}`, 'i');

    query = {
      ...query,
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ]
    };
  }
  const data = await Provider.getProviderList(query, payload['page'], payload['limit']);
  const totalRecords = await data.totalRecords;
  return {
    list: await data.list,
    total: totalRecords.length,
    limit: (payload['limit'])?payload['limit']:LIMIT.SERVICES
  };
};

/********* Add provider plan *********/
export const addPlan = async payload => {
  return await Provider.addPlan(payload); 
};

/********* Update provider plan *********/
export const updatePlan = async payload => {
  return await Provider.updatePlan(payload); 
};

/********** Delete plan **********/
export const deleteProviderPlan = async payload => {
  return await Provider.deletePlan(payload);
};


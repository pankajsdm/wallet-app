/*
 * @file: page.js
 * @description: It contain function layer for service controller.
 * @author: Pankaj Pandey
 */


import Provider from '../collections/provider';
import Message from '../utilities/messages';
import { LIMIT } from '../utilities/constants';
import { generateSlug } from '../utilities/universal';
import mongoose from 'mongoose';
import { uploadFormDataFile, uploadDocument } from '../utilities/upload';

/********* Add provider *********/
export const add = async payload => {
  payload.slug =  generateSlug(payload.title);
  if (await Provider.findOneByCondition({ slug: payload.slug}))
    throw new Error(Message.dataExist('provider'));

    if(payload.files){
      const fileData = payload.files.file.data;
      const folder = `images/provider`;
      const fileName = `${Date.now()}-${payload.files.file.name}`;
      const imageUploadStatus = await uploadFormDataFile(fileData, folder, fileName);  
      if(imageUploadStatus){
        const imgObject = {
          filename: fileName,
          src: `${payload.appUrl}/${folder}/original/${fileName}`,
          thumbnail: `${payload.appUrl}/${folder}/thumbnail/${fileName}`,
        };
        payload.image = imgObject;
        return await Provider.add(payload);
      }
    }else{
      const imgObject = {
        filename: 'service.png',
        src: `${payload.appUrl}/images/dummy/service.png`,
        thumbnail: `${payload.appUrl}/images/dummy/thumbnail/service.png`,
      };
      payload.image = imgObject;
      return await Provider.add(payload);
    } 
};

/********** Update  provider **********/
export const update = async payload => {
  payload.slug =  generateSlug(payload.title);
  if (await Provider.findOneByCondition({ _id: { $ne: payload._id }, slug: payload.slug}))
    throw new Error(Message.dataExist('provider'));

  if(payload.files){
    const fileData = payload.files.file.data;
    const folder = `images/provider`;
    const fileName = `${Date.now()}-${payload.files.file.name}`;
    const imageUploadStatus = await uploadFormDataFile(fileData, folder, fileName);  
    if(imageUploadStatus){
      const imgObject = {
        filename: fileName,
        src: `${payload.appUrl}/${folder}/original/${fileName}`,
        thumbnail: `${payload.appUrl}/${folder}/thumbnail/${fileName}`,
      };
      payload.image = imgObject;
      return await Provider.updateById(payload);
    }
  }else{
    const getProvider = await Provider.findOneByCondition({ _id: payload._id});
    payload.image = getProvider.image
    return await Provider.updateById(payload);
  }
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
  let query = { status: 1, _id: mongoose.Types.ObjectId(payload.providerId)};
  if(payload.search){
    const regex = new RegExp(`${payload.search}`, 'i');
    query = {
      ...query,
      $or: [
        { "plans.title": { $regex: regex } },
        { "plans.description": { $regex: regex } },
      ]
    };
  }
  const data = await Provider.findPlanByProvider(query, payload['page'], payload['limit']);
  const totalRecords = await data.totalRecords;
  return {
    plans: await data.plans,
    total: totalRecords.length,
    limit: (payload['limit'])?payload['limit']:LIMIT.SERVICES
  };
};



/********* get provider by Id *********/
export const getProviderPlanById = async payload => {
  const getPlan =  await Provider.findPlanById(payload);
  return getPlan;
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


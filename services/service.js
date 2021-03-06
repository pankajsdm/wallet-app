/*
 * @file: page.js
 * @description: It contain function layer for service controller.
 * @author: Pankaj Pandey
 */


import User from '../collections/user';
import Service from '../collections/service';
import Message from '../utilities/messages';
import { LIMIT } from '../utilities/constants';
import { generateSlug } from '../utilities/universal';
import { uploadFormDataFile, uploadDocument } from '../utilities/upload';

/**************** Save Page **********/
export const saveService = async payload => {
  payload.slug = generateSlug(payload.title);
  if (await Service.findOneByCondition({ slug: payload.slug}))
    throw new Error(Message.dataExist('service'));

  if(payload.files){
      const fileData = payload.files.file.data;
      const folder = `images/service`;
      const fileName = `${Date.now()}-${payload.files.file.name}`;
      const imageUploadStatus = await uploadFormDataFile(fileData, folder, fileName);  
      if(imageUploadStatus){
        const imgObject = {
          filename: fileName,
          src: `${payload.appUrl}/${folder}/original/${fileName}`,
          thumbnail: `${payload.appUrl}/${folder}/thumbnail/${fileName}`,
        };
        payload.image = imgObject;
        return await Service.add(payload);
      }
    }else{
      const imgObject = {
        filename: 'service.png',
        src: `${payload.appUrl}/images/dummy/service.png`,
        thumbnail: `${payload.appUrl}/images/dummy/thumbnail/service.png`,
      };
      payload.image = imgObject;
      return await Service.add(payload);
    }
};


/********** Save Page **********/
export const updateService = async payload => {
  payload.slug = generateSlug(payload.title);
  if (await Service.findOneByCondition({ _id: { $ne: payload._id }, slug: payload.slug}))
    throw new Error(Message.dataExist('service'));

  if(payload.files){
      const fileData = payload.files.file.data;
      const folder = `images/service`;
      const fileName = `${Date.now()}-${payload.files.file.name}`;
      const imageUploadStatus = await uploadFormDataFile(fileData, folder, fileName);  
      if(imageUploadStatus){
        const imgObject = {
          filename: fileName,
          src: `${payload.appUrl}/${folder}/original/${fileName}`,
          thumbnail: `${payload.appUrl}/${folder}/thumbnail/${fileName}`,
        };
        payload.image = imgObject;
        return await Service.updateById(payload);
      }
  }else{
    const getService = await Service.findOneByCondition({ _id: payload._id});
    payload.image = getService.image
    return await Service.updateById(payload);
  }
};

/********** Delete Page **********/
export const deleteService = async payload => {
  return await Service.delete({_id: payload._id});
};


/********* get user list *********/
export const getAll = async payload => {
  let query = { status: 1 };
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
  const data = await Service.getServiceList(query, payload['page'], payload['limit']);
  const totalRecords = await data.totalRecords;
  return {
    list: await data.list,
    total: totalRecords.length,
    limit: (payload['limit'])?payload['limit']:LIMIT.SERVICES
  };
};


/********* get user list *********/
export const getServiceById = async payload => {
  const conditionObj = {_id : payload._id };
  return await Service.findOneByCondition(conditionObj);
};

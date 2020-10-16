/*
 * @file: page.js
 * @description: It contain function layer for report service.
 * @author: Pankaj Pandey
 */


import Location from '../collections/location';
import Message from '../utilities/messages';
import { generateSlug } from '../utilities/universal';
import Report from '../collections/report';
import { uploadFormDataFile, uploadDocument } from '../utilities/upload';


/**************** Create report **********/
export const addReport = async payload => {
  if(payload.files){
    const fileData = payload.files.file.data;
    const folder = `images/report`;
    const fileName = `${Date.now()}-${payload.files.file.name}`;
    const imageUploadStatus = await uploadFormDataFile(fileData, folder, fileName);  
    if(imageUploadStatus){
      const imgObject = {
        filename: fileName,
        src: `${payload.appUrl}/${folder}/original/${fileName}`,
        thumbnail: `${payload.appUrl}/${folder}/thumbnail/${fileName}`,
      };
      payload.image = imgObject;
      return await Report.add(payload);
    }
  }else{
    return await Report.add(payload);
  }
};

/********* get report list *********/
export const getAll = async payload => {
  let query = { status: 1 };
  if (payload.search) {
    const regex = new RegExp(`${payload.search}`, 'i');

    query = {
      ...query,
      $or: [
        { subject: { $regex: regex } },
        { description: { $regex: regex } },
      ]
    };
  }
  const data = await Report.getReportList(query, payload['page'], payload['limit']);
  const totalRecords = await data.totalRecords;
  return {
    list: await data.list,
    total: totalRecords.length,
    limit: (payload['limit'])?payload['limit']:LIMIT.SERVICES
  };
};


/********* View report by id *********/
export const getReportById = async payload => {
  const conditionObj = {_id : payload._id };
  return await Report.findOneByCondition(conditionObj);
};


/********** Delete report by change its status **********/
export const deleteReport = async payload => {
    const getReport = await Report.findOneByCondition({ _id: payload._id});
    if(!getReport)
      throw new Error(Message.dataNotExist('Report'));

    return await Report.updateById({ _id: payload._id, status:2});
};

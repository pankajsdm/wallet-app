/*
 * @file: page.js
 * @description: It contain function layer for card controller.
 * @author: Pankaj Pandey
 */



import Message from '../utilities/messages';
import Card from '../collections/card';
import { generateSlug } from '../utilities/universal';
import { uploadFormDataFile, uploadDocument } from '../utilities/upload';

/********** Add card **********/
export const add = async payload => {
 
  payload.slug = generateSlug(payload.title);
  if (await Card.findOneByCondition({ slug: payload.slug}))
    throw new Error(Message.dataExist('Card'));

    if(payload.files){
      const fileData = payload.files.file.data;
      const folder = `images/card`;
      const fileName = `${Date.now()}-${payload.files.file.name}`;
      const imageUploadStatus = await uploadFormDataFile(fileData, folder, fileName);  
      if(imageUploadStatus){
        const imgObject = {
          filename: fileName,
          src: `${payload.appUrl}/${folder}/original/${fileName}`,
          thumbnail: `${payload.appUrl}/${folder}/thumbnail/${fileName}`,
        };
        payload.image = imgObject;
        return await Card.add(payload);
      }
    }else{
      const imgObject = {
        filename: 'service.png',
        src: `${payload.appUrl}/images/dummy/service.png`,
        thumbnail: `${payload.appUrl}/images/dummy/thumbnail/service.png`,
      };
      payload.image = imgObject;
      return await Card.add(payload);
    }

};


/********** Update card **********/
export const update = async payload => {
  payload.slug = generateSlug(payload.title);
  if (await Card.findOneByCondition({ _id: { $ne: payload._id }, slug: payload.slug}))
    throw new Error(Message.dataExist('Card'));

  if(payload.files){
      const fileData = payload.files.file.data;
      const folder = `images/card`;
      const fileName = `${Date.now()}-${payload.files.file.name}`;
      const imageUploadStatus = await uploadFormDataFile(fileData, folder, fileName);  
      if(imageUploadStatus){
        const imgObject = {
          filename: fileName,
          src: `${payload.appUrl}/${folder}/original/${fileName}`,
          thumbnail: `${payload.appUrl}/${folder}/thumbnail/${fileName}`,
        };
        payload.image = imgObject;
        return await Card.updateById(payload);
      }
  }else{
    const getCard = await Card.findOneByCondition({ _id: payload._id});
    payload.image = getCard.image;
    return await Card.updateById(payload);
  }
};

/********* Get cards list *********/
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
  const data = await Card.getCardList(query, payload['page'], payload['limit']);
  const totalRecords = await data.totalRecords;
  return {
    list: await data.list,
    total: totalRecords.length,
    limit: (payload['limit'])?payload['limit']:LIMIT.SERVICES
  };
};

/********* Get card by id *********/
export const getCardById = async payload => {
  const conditionObj = {_id : payload._id };
  return await Card.findOneByCondition(conditionObj);
};


/********** Delete Page **********/
export const deleteService = async payload => {
  return await Card.delete({_id: payload._id});
};
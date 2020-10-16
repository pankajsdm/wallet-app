/*
 * @file: page.js
 * @description: It contain function layer for location service.
 * @author: Pankaj Pandey
 */


import Location from '../collections/location';
import Message from '../utilities/messages';
import { generateSlug } from '../utilities/universal';
import { uploadFormDataFile, uploadDocument } from '../utilities/upload';

/********** Add location **********/
export const addLocation = async payload => {
  payload.slug = generateSlug(payload.title);

  if(payload.files){
    const fileData = payload.files.file.data;
    const folder = `images/location`;
    const fileName = `${Date.now()}-${payload.files.file.name}`;
    const imageUploadStatus = await uploadFormDataFile(fileData, folder, fileName);  
    if(imageUploadStatus){
      const imgObject = {
        filename: fileName,
        src: `${payload.appUrl}/${folder}/original/${fileName}`,
        thumbnail: `${payload.appUrl}/${folder}/thumbnail/${fileName}`,
      };

      payload.image = imgObject;
      payload.location = {
        type : "Point",
        coordinates : [payload.latitude, payload.longitude]
      }
      return await Location.add(payload);
    }
  }else{
    payload.location = {
      type : "Point",
      coordinates : [payload.latitude, payload.longitude]
    }
    return await Location.add(payload);
  }
};


/********** Update location **********/
export const updateLocation = async payload => {
  payload.slug = generateSlug(payload.title);

  if(payload.files){
    const fileData = payload.files.file.data;
    const folder = `images/location`;
    const fileName = `${Date.now()}-${payload.files.file.name}`;
    const imageUploadStatus = await uploadFormDataFile(fileData, folder, fileName);  
    if(imageUploadStatus){
      const imgObject = {
        filename: fileName,
        src: `${payload.appUrl}/${folder}/original/${fileName}`,
        thumbnail: `${payload.appUrl}/${folder}/thumbnail/${fileName}`,
      };

      payload.image = imgObject;
      payload.location = {
        type : "Point",
        coordinates : [payload.latitude, payload.longitude]
      }
      return await Location.updateById(payload);
    }
  }else{

    const getLocation = await Location.findOneByCondition({ _id: payload._id});
    payload.image = getLocation.image;
    payload.location = {
      type : "Point",
      coordinates : [payload.latitude, payload.longitude]
    }
    return await Location.updateById(payload);
  }
};


/********* get location by id *********/
export const getLocationById = async payload => {
  const conditionObj = {_id : payload._id };
  return await Location.findOneByCondition(conditionObj);
};



/********* get location list *********/
export const getAll = async payload => {
  let query = { status: 1 };

  if(payload.role)
    query.role = payload.role;

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
  const data = await Location.getLocationList(query, payload['page'], payload['limit']);
  const totalRecords = await data.totalRecords;
  return {
    list: await data.list,
    total: totalRecords.length,
    limit: (payload['limit'])?payload['limit']:LIMIT.SERVICES
  };
};

/********** Save Page **********/
export const getNearBy = async payload => {
    const coordinates = [payload.latitude, payload.longitude];
    const query = {
      location: {
          $near: {
            $geometry: { type: "Point",  coordinates: coordinates },
            $maxDistance: payload.distance
        }
      }
    }
    return await Location.findAll(query);
};

/********** Delete location **********/
export const deleteLocation = async payload => {
  return await Location.delete({_id: payload._id});
};




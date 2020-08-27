/*
 * @file: gallery.js
 * @description: It Contain function layer for gallery service.
 * @author: Pankaj Pandey
 */

import { uploadFormDataFile } from '../utilities/upload';
import {
  FOLDER_TYPE,
  LIMIT,
  ROLE,
  NOTIFICATION_TYPE,
  NOTIFICATION_CATEGORY
} from '../utilities/constants';
import User from '../collections/user';
import Message from '../utilities/messages';

/********** upload file and save in gallery **********/
export const uploadfiles = async req => {
  const payload = req.files.file.data;
  const folder = req.params.type;
  const fileName = `${folder}-${Date.now()}-${req.files.file.name}`;
  await uploadFormDataFile(payload, folder, fileName);  
  
  const data = {
    original: fileName,
    thumbnail: fileName,
    folder
  };
  return fileName;
};



/*
 * @file: galleries.js
 * @description: It Contain function layer for galleries controller.
 * @author: Pankaj Pandey
 */
import fs from 'fs';
import path from 'path';
import {
  uploadfiles,
  removeFile,
  getFileById,
  getMediaDetailById

} from '../services/gallery';
import { successAction, failAction } from '../utilities/response';
import Message from '../utilities/messages';
import { ROLE } from '../utilities/constants';

/**************** Upload image ***********/
export const fileUpload = async (req, res, next) => {
  try {
    const data = await uploadfiles(req);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    console.log(error);
    res.status(400).json(failAction(error.message));
  }
};


/**************** Get detail of gallery by id ***********/
export const getMediaDetail = async (req, res, next) => {
  try {
    const data = await getMediaDetailById(req.params.id);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Get file by id ***********/
export const getFile = async (req, res, next) => {
  try {
    const data = await getFileById(req.params.fileType, req.params.id);
    fs.readFile(path.join(__dirname, `../public/uploads/images/${data}`), function(err, content) {
      if (err) {
        res.writeHead(400, { 'Content-type': 'text/html' });
        res.end('No such image');
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200, { 'Content-type': 'image/jpg' });
        res.end(content);
      }
    });
  } catch (error) {
    res.writeHead(400, { 'Content-type': 'text/html' });
    res.end('No such image');
  }
};

/**************** Delete files ***********/
export const deleteFile = async (req, res, next) => {
  try {
    await removeFile(req.params.id);
    res.status(200).json(successAction(null, Message.fileDeleted));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

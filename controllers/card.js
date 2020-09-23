/*
 * @file: Page.js
 * @description: It contain function layer for card controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as cardService from '../services/card';
import Message from '../utilities/messages';
import { ROLE } from '../utilities/constants';

/**************** Add card ***********/
export const add = async (req, res, next) => {
  if (req.user.role === ROLE.ADMIN || req.user.role === ROLE.CENTRALOFFICEUSER || req.user.role === ROLE.MARKEDLOCATIONUSER){
    try {
      
      const payload = req.body;
      payload.files = req.files;
      payload.appUrl = `${req.protocol}://${req.headers.host}`;
      payload.userId = req.user.userId;
      payload.translation = JSON.parse(payload.translation);
      const data = await cardService.add(payload);
      res.status(200).json(successAction(data, Message.dataAdded('Card')));
    } catch (error) {
      res.status(400).json(failAction(error.message));
    }
  }else
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
};

/**************** Update card ***********/
export const update = async (req, res, next) => {
  if (req.user.role === ROLE.ADMIN || req.user.role === ROLE.CENTRALOFFICEUSER || req.user.role === ROLE.MARKEDLOCATIONUSER){
  
    try {
      const payload = req.body;
      payload.files = req.files;
      payload.appUrl = `${req.protocol}://${req.headers.host}`;
      payload.userId = req.user.userId;
      payload.translation = JSON.parse(payload.translation);
      const data = await cardService.update(payload);
      res.status(200).json(successAction(data, Message.dataUpdated('Service')));
    } catch (error) {
      res.status(400).json(failAction(error.message));
    }
  }else
  return res.status(400).json(failAction(Message.unauthorizedUser));
};

/**************** Get card ***********/
export const getLists = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await cardService.getAll(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** Get single card ***********/
export const getSingleCard = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await cardService.getCardById(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Delete card ***********/
export const deleteCard = async (req, res, next) => {

  console.log("req.user", req.user)
  if (req.user.role === ROLE.ADMIN || req.user.role === ROLE.CENTRALOFFICEUSER || req.user.role === ROLE.MARKEDLOCATIONUSER){
    try {
      const payload = req.params;
      const data = await cardService.deleteService(payload);
      res.status(200).json(successAction(data, Message.dataDeleted('Card')));
    } catch (error) {
      res.status(400).json(failAction(error.message));
    }

  }else
    return res.status(400).json(failAction(Message.unauthorizedUser));
};







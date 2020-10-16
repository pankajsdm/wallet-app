/*
 * @file: Page.js
 * @description: It contain function layer for card controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as cardService from '../services/card';
import Message from '../utilities/messages';
import { ROLE, STATUSCODE } from '../utilities/constants';


/**************** Add card ***********/
export const add = async (req, res, next) => {
    try {
      const payload = req.body;
      payload.files = req.files;
      payload.appUrl = `${req.protocol}://${req.headers.host}`;
      payload.userId = req.user.userId;
      if(payload.translation)
        payload.translation = JSON.parse(payload.translation);

      const data = await cardService.add(payload);
      res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataAdded('Card')));
    } catch (error) {
      res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
    }
};

/**************** Update card ***********/
export const update = async (req, res, next) => {
    try {
      const payload = req.body;
      payload.files = req.files;
      payload.appUrl = `${req.protocol}://${req.headers.host}`;
      payload.userId = req.user.userId;
      if(payload.translation)
        payload.translation = JSON.parse(payload.translation);

      const data = await cardService.update(payload);
      res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataUpdated('Service')));
    } catch (error) {
      res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
    }
};

/**************** Get card ***********/
export const getLists = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await cardService.getAll(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** Get single card ***********/
export const getSingleCard = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await cardService.getCardById(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Add card ***********/
export const apply = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.userId = req.user.userId;
    const data = await cardService.applyUserCard(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataAdded('Card')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** Delete card ***********/
export const deleteCard = async (req, res, next) => {
    try {
      const payload = req.params;
      const data = await cardService.deleteService(payload);
      res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataDeleted('Card')));
    } catch (error) {
      res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
    }
};







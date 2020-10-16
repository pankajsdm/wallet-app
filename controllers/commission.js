/*
 * @file: commission.js
 * @description: It contain function layer for commission controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as commissionServiceService from '../services/commission';
import Message from '../utilities/messages';
import { STATUSCODE } from '../utilities/constants';


/**************** create commission  ***********/
export const add = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.userId = req.user.userId;
    const data = await commissionServiceService.addCommission(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataAdded("Commission")));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** Update commission ***********/
export const update = async (req, res, next) => {
  try {
    const payload = req.body;
      if(payload.translation)
        payload.translation = JSON.parse(payload.translation);
      
    const data = await providerService.update(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataUpdated('Service')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Get commission lists ***********/
export const getLists = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await commissionServiceService.getAll(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Get report lists ***********/
export const getCommission = async (req, res, next) => {
  try {
    const payload =  req.params;
    const data = await commissionServiceService.getCommissionById(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** Delete location ***********/
export const deleteCommission = async (req, res, next) => {
 try {
    const payload = req.params;
    const data = await commissionServiceService.deleteTaxCommission(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataDeleted('Commission')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};




/*
 * @file: Page.js
 * @description: It contain function layer for service controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as serviceService from '../services/service';
import Message from '../utilities/messages';
import { ROLE } from '../utilities/constants';

/**************** Add service ***********/
export const add = async (req, res, next) => {

  if (req.user.role !== ROLE.ADMIN)
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  try {
    const payload = req.body;
    payload.userId = req.user.userId;
    const data = await serviceService.saveService(payload);
    res.status(200).json(successAction(data, Message.serviceAdded(payload.type)));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** Update service ***********/
export const addProvider = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN) 
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  try {
    const payload = req.body;
    const data = await serviceService.addProvider(payload);
    res.status(200).json(successAction(data, Message.serviceAdded('Service')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};





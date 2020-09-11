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
    res.status(200).json(successAction(data, Message.dataAdded('Service')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** Update service ***********/
export const update = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN)
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  try {
    const payload = req.body;
    const data = await serviceService.updateService(payload);
    res.status(200).json(successAction(data, Message.dataUpdated('Service')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** Delete service ***********/
export const deleteService = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN)
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  try {
    const payload = req.body;
    const data = await serviceService.deleteService(payload);
    res.status(200).json(successAction(data, Message.dataDeleted('Service')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** Update service ***********/
export const getLists = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await serviceService.getAll(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** Update service ***********/
export const getSingleService = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await serviceService.getServiceById(payload);
    res.status(200).json(successAction(data, Message.success));
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
    res.status(200).json(successAction(data, Message.dataAdded('Provider')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};





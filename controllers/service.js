/*
 * @file: Page.js
 * @description: It contain function layer for service controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as serviceService from '../services/service';
import * as providerService from '../services/provider';
import Message from '../utilities/messages';
import { ROLE } from '../utilities/constants';

/**************** Add service ***********/
export const add = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN)
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  try {
    const payload = req.body;
    payload.files = req.files;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    payload.userId = req.user.userId;
    payload.translation = JSON.parse(payload.translation);
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
    payload.files = req.files;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    payload.userId = req.user.userId;
    payload.translation = JSON.parse(payload.translation);
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
    const payload = req.params;
    const data = await serviceService.deleteService(payload);
    res.status(200).json(successAction(data, Message.dataDeleted('Service')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** get service list ***********/
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



/*
* Start api for service providers
* add, update, delete and fetch all
*/

/***************** Get the providers ********************/
export const getProviders = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await providerService.getAll(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** get single provider ***********/
export const getSingleProvider = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await providerService.getProviderById(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Add provider ***********/
export const addProvider = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN) 
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  try {

    const payload = req.body;
    payload.files = req.files;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    payload.userId = req.user.userId;
    payload.translation = JSON.parse(payload.translation);

    const data = await providerService.add(payload);
    res.status(200).json(successAction(data, Message.dataAdded('Provider')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Update provider ***********/
export const updateProvider = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN)
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  try {
    const payload = req.body;
    payload.files = req.files;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    payload.userId = req.user.userId;
    payload.translation = JSON.parse(payload.translation);
    const data = await providerService.update(payload);
    res.status(200).json(successAction(data, Message.dataUpdated('Service')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Delete provider ***********/
export const deleteProvider = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN)
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  try {
    const payload = req.params;
    const data = await providerService.deleteProvider(payload);
    res.status(200).json(successAction(data, Message.dataDeleted('Provider')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/*
* Start api for provider plans
* add, update, delete and fetch all
*/

/**************** Add plan for particular provider ***********/
export const addProviderPlan = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN) 
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  try {
    const payload = req.body;
    const data = await providerService.addPlan(payload);
    res.status(200).json(successAction(data, Message.dataAdded('Provider')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Update plan ***********/
export const updateProviderPlan = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN)
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  try {
    const payload = req.body;
    const data = await providerService.updatePlan(payload);
    res.status(200).json(successAction(data, Message.dataUpdated('Service')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** get list of provider plan ***********/
export const listProviderPlan = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await providerService.getlistProviderPlan(payload);
    data.providerId = payload.providerId;
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** get single plan ***********/
export const getSingleProviderPlan = async (req, res, next) => {
  try {
    const responseObject = {};
    const payload = req.body;
    const data = await providerService.getProviderPlanById(payload);
    responseObject.providerId = payload.providerId;
    if(data[0].user)
      responseObject.walletAmount = data[0].user[0].wallet.amount;

    responseObject.plans = data[0].plans[0];
    res.status(200).json(successAction( responseObject, Message.success));

  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Delete provider plan ***********/
export const deleteProviderPlan = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN)
    return res.status(400).json(failAction(Message.unauthorizedUser));

  try {
    const payload = req.params;
    const data = await providerService.deleteProviderPlan(payload);
    res.status(200).json(successAction(data, Message.dataDeleted('Provider')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};



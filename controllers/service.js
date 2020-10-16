/*
 * @file: Page.js
 * @description: It contain function layer for service controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as serviceService from '../services/service';
import * as providerService from '../services/provider';
import * as userService from '../services/user';
import Message from '../utilities/messages';
import { ROLE, STATUSCODE } from '../utilities/constants';


/**************** Add service ***********/
export const add = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.files = req.files;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    payload.userId = req.user.userId;

    if(payload.translation)
      payload.translation = JSON.parse(payload.translation);

    const data = await serviceService.saveService(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataAdded('Service')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** Update service ***********/
export const update = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.files = req.files;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    payload.userId = req.user.userId;
    if(payload.translation)
      payload.translation = JSON.parse(payload.translation);
      
    const data = await serviceService.updateService(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataUpdated('Service')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** Delete service ***********/
export const deleteService = async (req, res, next) => {
  try {
    const payload = req.params;
    let checkProviderExistRequest = {serviceId: payload._id, limit: 10}
    const checkProviderExist = await providerService.getAll(checkProviderExistRequest);
    if(checkProviderExist && checkProviderExist.list.length>0){
      res.status(STATUSCODE.NOTALLOWED).json(failAction(Message.cantDeletedWithoutDeleteRelativeData('Service', 'providers'), STATUSCODE.NOTALLOWED ));
    }else{   
      const data = await serviceService.deleteService(payload);
      res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataDeleted('Service')));
    }
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** get service list ***********/
export const getLists = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await serviceService.getAll(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** Update service ***********/
export const getSingleService = async (req, res, next) => {
  try {
    const payload =  req.params;
    const data = await serviceService.getServiceById(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
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
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** get single provider ***********/
export const getSingleProvider = async (req, res, next) => {
  try {
    const payload =  req.params;
    const data = await providerService.getProviderById(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Add provider ***********/
export const addProvider = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.files = req.files;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    payload.userId = req.user.userId;

    if(payload.translation)
      payload.translation = JSON.parse(payload.translation);

    const data = await providerService.add(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataAdded('Provider')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Update provider ***********/
export const updateProvider = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.files = req.files;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    payload.userId = req.user.userId;

    if(payload.translation)
      payload.translation = JSON.parse(payload.translation);
      
    const data = await providerService.update(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataUpdated('Service')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Delete provider ***********/
export const deleteProvider = async (req, res, next) => {
  try {
    const payload = req.params;
    let checkProviderExistRequest = {providerId: payload._id, limit: 10}
    const checkProviderExist = await providerService.getlistProviderPlan(checkProviderExistRequest);
    if(checkProviderExist && checkProviderExist.plans.length>0){
      res.status(STATUSCODE.NOTALLOWED).json(failAction(Message.cantDeletedWithoutDeleteRelativeData('Provider', 'plans'), STATUSCODE.NOTALLOWED ));
    }else{
      const data = await providerService.deleteProvider(payload);
      res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataDeleted('Provider')));
    }
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/*
* Start api for provider plans
* add, update, delete and fetch all
*/

/**************** Add plan for particular provider ***********/
export const addProviderPlan = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await providerService.addPlan(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataAdded('Provider')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Update plan ***********/
export const updateProviderPlan = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await providerService.updatePlan(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataUpdated('Service')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** get list of provider plan ***********/
export const listProviderPlan = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await providerService.getlistProviderPlan(payload);
    data.providerId = payload.providerId;
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** get single plan ***********/
export const getSingleProviderPlan = async (req, res, next) => {
  try {
    
    const payload =  req.params;
    const data = await providerService.getProviderPlanById(payload);

    if(data[0].plans[0]){
      const responseObject = {};
      responseObject.providerId = payload.providerId;
      if(data[0].image)
        responseObject.providerImage = data[0].image

        
      const userData = await userService.userDetail(req.user.userId);
      if(userData)
        responseObject.walletAmount = userData.wallet.amount;
        
      responseObject.plans = data[0].plans[0]; 
      res.status(STATUSCODE.SUCCESS).json(successAction( responseObject, Message.success));
    }else
      res.status(STATUSCODE.SUCCESS).json(successAction( [], Message.success));
    
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Delete provider plan ***********/
export const deleteProviderPlan = async (req, res, next) => {
  try {
    const payload = req.params;
    const data = await providerService.deleteProviderPlan(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataDeleted('Provider')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};



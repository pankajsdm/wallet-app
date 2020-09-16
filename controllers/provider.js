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
  
  const payload = req.body;
  payload.userId = req.user.userId;
  try {
    const data = await serviceService.saveService(payload);
    res.status(200).json(successAction(data, Message.serviceAdded(payload.type)));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


/**************** Update provider ***********/
export const update = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN) {
    return res.status(400).json(failAction(Message.unauthorizedUser));
  }
  const payload = req.body;
  try {
    const data = await updatePage(payload);
    res.status(200).json(successAction(data, Message.pageUpdated('Page')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Get detail of service by slug ***********/
export const getDetailByType = async (req, res, next) => {
  try {
    const data = await getPageDetail(req.params.type);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};



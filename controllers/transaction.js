/*
 * @file: Page.js
 * @description: It contain function layer for service controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as transactionService from '../services/transaction';
import Message from '../utilities/messages';
import { ROLE } from '../utilities/constants';

/**************** Add service ***********/
export const add = async (req, res, next) => {
  console.log("req.body", req.body, req.user.role)
  if (req.user.role !== ROLE.ADMIN || req.user.role !== ROLE.CENTRALOFFICEUSER || req.user.role !== ROLE.MARKEDLOCATIONUSER)
    return res.status(400).json(failAction(Message.unauthorizedUser));
  
  console.log("I am not here")
  const payload = req.body;
  payload.userId = req.user.userId;
  try {
    const data = await transactionService.addTransaction(payload);
    res.status(200).json(successAction(data, Message.serviceAdded(payload.type)));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};





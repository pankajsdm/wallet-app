/*
 * @file: transaction.js
 * @description: It contain function layer for transaction controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as transactionService from '../services/transaction';
import Message from '../utilities/messages';
import { ROLE, STATUSCODE } from '../utilities/constants';

/**************** Add trasaction ***********/
export const add = async (req, res, next) => {
  if (req.user.role === ROLE.ADMIN || req.user.role === ROLE.CENTRALOFFICEUSER || req.user.role === ROLE.MARKEDLOCATIONUSER){
    const payload = req.body;
    payload.from = req.user.userId;
    try {
      const data = await transactionService.addTransaction(payload);
      res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.trasactionMade('Trasaction')));
    } catch (error) {
      res.status(STATUSCODE.SERVERERROR).json(failAction(error.message, STATUSCODE.SERVERERROR));
    }
  }else
    return res.status(STATUSCODE.UNAUTHORIZED).json(failAction(Message.unauthorizedUser));
  
  
};






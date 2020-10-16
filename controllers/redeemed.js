/*
 * @file: Page.js
 * @description: It contain function layer for redeemed controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as redeemedService from '../services/redeemed';
import Message from '../utilities/messages';
import { ROLE, STATUSCODE } from '../utilities/constants';

/**************** Add service ***********/
export const create = async (req, res, next) => {
  if (req.user.role === ROLE.SUBSCRIBER){
    const payload = req.body;
    payload.userId = req.user.userId;
    try {
      const data = await redeemedService.create(payload);
      res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.redeemedCoupon));
    } catch (error) {
      res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
    }
  }else
    return res.status(STATUSCODE.UNAUTHORIZED).json(failAction(Message.unauthorizedUser));
  
  
};






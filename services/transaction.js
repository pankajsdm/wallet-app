/*
 * @file: page.js
 * @description: It contain function layer for transaction controller.
 * @author: Pankaj Pandey
 */


import User from '../collections/user';
import Message from '../utilities/messages';
import Location from '../collections/location';
import Transaction from '../collections/transaction';

/********** Add trasaction **********/
export const addTransaction = async payload => {
 
  const userData = await User.findOneByCondition({_id: payload.userId});
  const locationData = await Location.findOneByCondition({_id: payload.locationId});
  
  if (!userData) 
    throw new Error(Message.userNotExist);

  if (!locationData) 
    throw new Error(Message.locationNotExist);

  return await Transaction.add(payload);
};

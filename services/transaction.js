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

   

  let totalAmount = 0;
  if(payload.type===1){
    totalAmount = userData.wallet.amount + payload.amount;
  } else{
    if(userData.wallet.amount >= payload.amount)
      totalAmount = userData.wallet.amount - payload.amount;
    else
      throw new Error(Message.invalidAmount);
  }
  
  const transactionStatus =  await Transaction.add(payload);
  if(transactionStatus && userData.wallet){
    const updatedObj = { "wallet.amount": totalAmount, userId: payload.userId }
    await User.updateUser(updatedObj);
  }

  return transactionStatus;

};

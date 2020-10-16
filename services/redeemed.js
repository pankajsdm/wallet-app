/*
 * @file: page.js
 * @description: It contain function layer for transaction controller.
 * @author: Pankaj Pandey
 */


import User from '../collections/user';
import Message from '../utilities/messages';
import Redeemed from '../collections/redeemed';
import Provider from '../collections/provider';

/********** Redeem particular service plan **********/
export const create = async payload => {
  const findPlan =  await Provider.findPlanById(payload);
  if(findPlan){
    let totalAmount = 0;
    let amount =  findPlan[0].plans[0].price;
    const userData = await User.findOneByCondition({_id: payload.userId});
    if(userData.wallet.amount >= amount)
      totalAmount = userData.wallet.amount - amount;
    else
      throw new Error(Message.invalidRedeemAmount);
    
    const updatedObj = { "wallet.amount": totalAmount, userId: payload.userId }
    await User.updateUser(updatedObj);

    let status = 2;
    await Provider.updatePlanStatus(payload, status)

    payload.planId = payload._id;
    return await Redeemed.add(payload)
  }else
    throw new Error(Message.dataNotExist('Plan'));
  
};

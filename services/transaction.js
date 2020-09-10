/*
 * @file: page.js
 * @description: It contain function layer for transaction controller.
 * @author: Pankaj Pandey
 */


import Transaction from '../collections/transaction';

/********** Add trasaction **********/
export const addTransaction = async payload => {
  return await Transaction.add(payload);
};

/*
 * @file: page.js
 * @description: It contain function layer for commission service.
 * @author: Pankaj Pandey
 */

import Commission from '../collections/commission';

/**************** Create commision **********/
export const addCommission = async payload => {
  return await Commission.add(payload);
};

/********* get commision list *********/
export const getAll = async payload => {
 let query = { status: 1 };
  if (payload.search) {
    const regex = new RegExp(`${payload.search}`, 'i');

    query = {
      ...query,
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ]
    };
  }
  const data = await Commission.getCommissionList(query, payload['page'], payload['limit']);
  const totalRecords = await data.totalRecords;
  return {
    list: await data.list,
    total: totalRecords.length,
    limit: (payload['limit'])?payload['limit']:LIMIT.SERVICES
  };
};


/********* View commision by id *********/
export const getCommissionById = async payload => {
  const conditionObj = {_id : payload._id };
  return await Commission.findOneByCondition(conditionObj);
};


/********** Delete commision by change its status **********/
export const deleteTaxCommission = async payload => {
  return await Commission.delete({_id: payload._id});
};

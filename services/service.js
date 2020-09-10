/*
 * @file: page.js
 * @description: It contain function layer for service controller.
 * @author: Pankaj Pandey
 */


import User from '../collections/user';
import Service from '../collections/service';
import Message from '../utilities/messages';
import { generateSlug } from '../utilities/universal';

/********** Save Page **********/
export const saveService = async payload => {
    payload.slug = generateSlug(payload.title);
    if (await Service.findOneByCondition({ slug: payload.slug}))
      throw new Error(Message.serviceExist);
    const data = await Service.add(payload);
    return data;
};

/********* Add provider *********/
export const addProvider = async payload => {
  const providers = {
    title: payload.title,
    slug: generateSlug(payload.title),
    description: payload.description,
  };

  const updatedObject = {
    serviceId: payload.serviceId,
    providers: providers
  }
  return await Service.addProvider(updatedObject); 
};

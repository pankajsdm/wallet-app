/*
 * @file: page.js
 * @description: It Contain function layer for page service.
 * @author: Pankaj Pandey
 */

import Page from '../collections/page';
import User from '../collections/user';
import { generateSlug, timeAgo } from '../utilities/universal';
import Message from '../utilities/messages';
import {
  ROLE,
  LIMIT,
  PAGE_TYPE,
  NOTIFICATION_TYPE,
  NOTIFICATION_CATEGORY
} from '../utilities/constants';

/********** Save Page **********/
export const savePage = async payload => {
  payload.slug = generateSlug(payload.title);
  if (await Page.findOneByCondition({ slug: payload.slug, type: payload.type }))
    throw new Error(Message.pageExist);
  const data = await Page.add(payload);
  return data;
};

/********** Save Page **********/
export const updatePage = async payload => {
  return await Page.updatePage(payload);
};

/********** Get Page detail by type **********/
export const getPageDetail = async type => {
  return await Page.findOneByCondition({ type }).select({
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
    status: 0
  });
};

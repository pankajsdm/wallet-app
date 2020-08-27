/*
 * @file: Page.js
 * @description: It Contain function layer for Page controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import {
  savePage,
  updatePage,
  getPageList,
  getPageDetail
} from '../services/page';
import Message from '../utilities/messages';
import { ROLE } from '../utilities/constants';

/**************** Add Page ***********/
export const add = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN) {
    return res.status(400).json(failAction(Message.unauthorizedUser));
  }
  const payload = req.body;
  try {
    const data = await savePage(payload);
    res.status(200).json(successAction(data, Message.pageAdded(payload.type)));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** Update Page ***********/
export const update = async (req, res, next) => {
  if (req.user.role !== ROLE.ADMIN) {
    return res.status(400).json(failAction(Message.unauthorizedUser));
  }
  const payload = req.body;
  try {
    const data = await updatePage(payload);
    res.status(200).json(successAction(data, Message.pageUpdated('Page')));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Get detail of Page by slug ***********/
export const getDetailByType = async (req, res, next) => {
  try {
    const data = await getPageDetail(req.params.type);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};



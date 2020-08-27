/*
 * @file: index.js
 * @description: It Contain function layer for page collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';
import { PAGE_TYPE } from '../../utilities/constants';

class PageClass {
  static add(payload) {
    return this(payload).save();
  }
  static findOneByCondition(condition) {
    return this.findOne({ ...condition, status: true });
  }
  static findByCondition(condition) {
    return this.find({ status: true, ...condition });
  }
  static updatePage(payload) {
    let condition = { _id: payload.id };
    if (Object.values(PAGE_TYPE).includes(payload.id)) {
      condition = { slug: payload.id };
      payload.slug = payload.id;
      payload.type = 'page';
      payload.status = true;
    }
    let updateData = {
      ...payload
    };

    return this.findOneAndUpdate(condition, updateData, {
      upsert: true,
      new: true
    });
  }
}

dbSchema.loadClass(PageClass);

export default mongoose.model('pages', dbSchema);

/*
 * @file: db-schema.js
 * @description: It Contain db schema for page collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      default: ''
    },
    status: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default pageSchema;

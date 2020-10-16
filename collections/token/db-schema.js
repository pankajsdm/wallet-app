/*
 * @file: db-schema.js
 * @description: It contain db schema for token collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    token: {
      type: String,
      default: ''
    },
    deviceToken: {
      type: String,
      default: null
    },
    deviceType: {
      type: String,
      default: null
    },
    createdAt: {
      type: Date,
      default: new Date()
    }
  },
  { timestamps: true }
);

export default tokenSchema;

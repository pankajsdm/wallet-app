/*
 * @file: db-schema.js
 * @description: It contain db schema for report collection.
 * @author: Pankaj Pandey
 */

import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    subject: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },

    image: { 
      filename: { type: String, default: null },
      src: { type: String, default: null },
      thumbnail: { type: String, default: null }
    },
    
    /*
    * Report status
    * 1 => active, 2=> Processed 3 => Deleted
    */
    status: {
      type: Number,
      default: 1
    }
    
  },
  { timestamps: true }
);


export default reportSchema;

/*
 * @file: db-schema.js
 * @description: It contain db schema for commission collection.
 * @author: Pankaj Pandey
 */

import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    title: {
      type: String,
      required: true
    },

    rate: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      required: true
    },
   
    status: {
      type: Number,
      default: 1
    }
    
  },
  { timestamps: true }
);


export default commissionSchema;

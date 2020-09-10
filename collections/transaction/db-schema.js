/*
 * @file: db-schema.js
 * @description: It contain db schema for transaction collection.
 * @author: Pankaj Pandey
 */

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location"
    },

    amount: {
      type: Number,
      required: true
    },

    note: {
      type: String,
      required: true
    },
   
    /*
    * Transaction status
    * 1 => processed, 2 => transferred
    */
    status: {
      type: Number,
      default: 2
    }
    
  },
  { timestamps: true }
);

export default transactionSchema;

/*
 * @file: db-schema.js
 * @description: It contain db schema for redeem collection.
 * @author: Pankaj Pandey
 */

import mongoose from "mongoose";

const redeemedSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider"
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider"
    },

    /*
    * Redeem status
    * 1 => active , 2 => expired
    */
    status: {
      type: Number,
      default: 1
    }
    
  },
  { timestamps: true }
);


export default redeemedSchema;

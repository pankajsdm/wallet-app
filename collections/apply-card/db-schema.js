/*
 * @file: db-schema.js
 * @description: It contain db schema for apply card collection.
 * @author: Pankaj Pandey
 */

import mongoose from "mongoose";

const applyCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: true
    },
    /*
    * Transaction status
    * 1 => active, 2 => Inactive
    */
    status: {
      type: Number,
      default: 1
    }
    
  },
  { timestamps: true }
);


export default applyCardSchema;

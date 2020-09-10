/*
 * @file: db-schema.js
 * @description: It contain db schema for service collection.
 * @author: Pankaj Pandey
 */

import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    title: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      default: null
    },

    description: {
      type: String,
      required: true
    },

    providers: [
      {
        title: { type: String, default: null },
        slug: { type: String, default: null },
        description: { type: String, default: null }
      }
    ],

    status: {
      type: Number,
      default: 1
    }
    
  },
  { timestamps: true }
);

export default serviceSchema;

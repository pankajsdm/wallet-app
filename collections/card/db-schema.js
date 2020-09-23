/*
 * @file: db-schema.js
 * @description: It contain db schema for card collection.
 * @author: Pankaj Pandey
 */

import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
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
      required: true
    },
    description: {
      type: String,
      required: true
    },
    feature: {
      type: String,
      required: true
    },

    image: { 
      filename: { type: String, default: null },
      src: { type: String, default: null },
      thumbnail: { type: String, default: null }
    },

    translation: [
      {
        language: { 
          type: String,
          default: '' 
        },
        title: { 
          type: String, 
          default: '' 
        },
        description: { 
          type: String, 
          default: '' 
        }
      },
    ],
   
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


export default cardSchema;

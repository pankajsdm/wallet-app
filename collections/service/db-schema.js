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

    status: {
      type: Number, 
      default: 1
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
    
  },
  { timestamps: true }
);

export default serviceSchema;

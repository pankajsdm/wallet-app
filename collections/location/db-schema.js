/*
 * @file: db-schema.js
 * @description: It contain db schema for service collection.
 * @author: Pankaj Pandey
 */

import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    /*
    * Define role for the office 
    * 1 => Branch office, 2 => Marked location
    */
    role: {
      type: Number,       
      required: true
    },                

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    location: {
      type: {
        type: String,
        required: true
      },
      coordinates: []
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


    status: {
      type: Number,
      default: 1
    }
    
  },
  { timestamps: true }
);

export default locationSchema;

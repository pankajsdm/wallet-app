/*
 * @file: db-schema.js
 * @description: It contain db schema for service collection.
 * @author: Pankaj Pandey
 */

import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
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

    image: { 
      filename: { type: String, default: null },
      src: { type: String, default: null },
      thumbnail: { type: String, default: null }
    },

    plans: [
      {
        title: { type: String, default: null },
        code: { type: Number, default: null },
        price: { type: Number, default: null },
        description: { type: String, default: null },
        status: { type: Number, default: 1 }, /* 1=> active, 2=> expired, 3=> inactive */
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
      }
    ],

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

export default providerSchema;

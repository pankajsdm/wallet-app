/*
 * @file: db-schema.js
 * @description: It Contain db schema for user collection.
 * @author: Pankaj Pandey
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    mobile: {
      code: { type: String, default: '+1' },
      number: { type: String, default: 0 }
    },
    firstName: {
      type: String,
      default: null
    },
    lastName: {
      type: String,
      default: null
    },

    city: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    },
    address: {
      type: String,
      default: ''
    },

    /*
    * Define role for the user 
    * 1 => ADMIN, 2 => CENTRALOFFICEUSER, 3 => MARKEDLOCATIONUSER, 4 => NORMALUSER
    */
    role: {
      type: Number,
      default: 4 
    },

    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location"
    },

    profileImage: { 
      filename: { type: String, default: null },
      src: { type: String, default: null },
      thumbnail: { type: String, default: null }
    },
    kyc: [
      {
        type: { 
          type: String,
          default: '' 
        },
        fileName: { 
          type: String, 
          default: '' 
        },
        fileUrl: { 
          type: String, 
          default: '' 
        },
        filePath: { 
          type: String, 
          default: '' 
        }
      }
    ],
    OTP: { 
      number: { type: Number, default: null},
      isVerified: { type: Boolean, default: false}
    },

    wallet: {
      currency: { type: String, default: 'IQD'},
      amount: { type: Number, default: 0},
      createdAt: {type: Date, default: new Date()}
    },

    status: {
      type: Number,
      default: 1    /* 0 => Inactive, 1=> Active, 2 => Deleted */
    },

    emailVerified: {
      type: Boolean,
      default: false
    },
    
    socketId: {
      type: String,
      default: null
    },
    timezoneFormat: {
      type: String,
      default: ""
    },
    lastLogin: {
      type: Date,
      default: null
    },
    
  },
  { timestamps: true }
);

export default userSchema;

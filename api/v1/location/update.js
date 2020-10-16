/*
 * @file: update.js
 * @description: Router is used to update location
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { update } from '../../../controllers/location'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/location/update:
 *  put:
 *   tags: ["Locations"]
 *   summary: update location for branch and marked location
 *   description: api used to update location for branch and marked location
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: formData
 *        name: _id
 *        type: string
 *        required: true
 *      - in: formData
 *        name: role
 *        type: string
 *        required: true
 *      - in: formData
 *        name: title
 *        type: string
 *        required: true
 *      - in: formData
 *        name: description
 *        type: string
 *        required: true
 *      - in: formData
 *        name: address
 *        type: string
 *        required: true
 *      - in: formData
 *        name: latitude
 *        type: string
 *        required: true
 *      - in: formData
 *        name: longitude
 *        type: string
 *        required: true
 *      - in: formData
 *        name: file
 *        type: file
 *      - in: formData
 *        name: translation
 *        type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const userSchema = Joi.object({
    _id: Joi.string()
      .required()
      .label('Location Id'),
    role: Joi.number()
      .required()
      .label('Office role'),
    title: Joi.string()
      .required()
      .label('Office title'),
    description: Joi.string()
      .label('Office description'),
    address: Joi.string()
      .required()
      .label('Office address'),
    latitude: Joi.number()
      .required()
      .label('Latitude'),
    longitude: Joi.number()
      .required()
      .label('Longitude'),
    file: Joi.string()
      .label('Service Image'),
    translation: Joi.string()
      .label('Translation'),
  });

app.put(
  '/location/update',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  update
);

export default app;

/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/location'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/location/add:
 *  post:
 *   tags: ["Locations"]
 *   summary: Add location for branch and marked location
 *   description: api used to add location for branch and marked location
 *   parameters:
 *      - in: header
 *        name: Authorization
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

app.post(
  '/location/add',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  add
);

export default app;

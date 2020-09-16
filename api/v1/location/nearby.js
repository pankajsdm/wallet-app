/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { nearby } from '../../../controllers/location'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/location/nearby-locations:
 *  post:
 *   tags: ["Location"]
 *   summary: Get nearby branch and marked location
 *   description: api used to get nearby branch and marked location
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Get nearby branch and marked location
 *        schema:
 *         type: object
 *         required:
 *          - Get nearby branch and marked location params: 
 *         properties:
 *           latitude:
 *            type: number
 *            required: 
 *           longitude:
 *            type: number
 *            required: 
 *           distance:
 *            type: number
 *            required: 
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const userSchema = Joi.object({
    latitude: Joi.number()
      .required()
      .label('Latitude'),
    longitude: Joi.number()
      .required()
      .label('Longitude'),
    distance: Joi.number()
      .label('Max distance')
  });

app.post(
  '/location/nearby-locations',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  nearby
);

export default app;

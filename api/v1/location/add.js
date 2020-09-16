/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/location'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/location/add:
 *  post:
 *   tags: ["Location"]
 *   summary: Add location for branch and marked location
 *   description: api used to location for branch and marked location
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Add location for branch and marked location
 *        schema:
 *         type: object
 *         required:
 *          - user add
 *         properties:
 *           role:
 *            type: number
 *            required: 
 *           title:
 *             type: string
 *             required:
 *           description:
 *             type: string
 *             required:
 *           address:
 *             type: string
 *             required:
 *           latitude:
 *             type: number
 *             required:
 *           longitude:
 *             type: number
 *             required:
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
  });

app.post(
  '/location/add',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  add
);

export default app;

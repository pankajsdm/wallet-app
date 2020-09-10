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
 *   tags: ["location"]
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
 *           coords:
 *               type: object
 *               description: cordinates for lat and lng
 *               properties:
 *                 lat:
 *                   type: string
 *                 lng:
 *                   type: string
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
    coords: Joi.object({
        lat: Joi.string().required().label('Latitude'),
        lng: Joi.string().required().label('Longitude'),
    }),
  });

app.post(
  '/location/add',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  add
);

export default app;

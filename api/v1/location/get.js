/*
 * @file: get.js
 * @description: It contain get loction by id router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { get } from '../../../controllers/location';
import { checkToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/location/get/{id}:
 *  get:
 *   tags: ["Locations"]
 *   consumes:
 *    - multipart/form-data
 *   summary: Api for geting location by id 
 *   description: api used to get location by id
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true 
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  '/location/get/:_id',
  checkToken,
  get
);

export default app;

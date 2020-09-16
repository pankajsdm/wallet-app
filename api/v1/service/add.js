/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/service'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/add:
 *  post:
 *   tags: ["Services"]
 *   summary: Add Service
 *   description: api used to add new service
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Add new service
 *        schema:
 *         type: object
 *         required:
 *          - user add
 *         properties:
 *           title:
 *             type: string
 *             required:
 *           description:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const userSchema = Joi.object({
    title: Joi.string()
      .required()
      .label('Service title'),
    description: Joi.string()
      .label('Description')
  });

app.post(
  '/service/add',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  add
);

export default app;

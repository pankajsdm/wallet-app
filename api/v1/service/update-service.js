/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { update } from '../../../controllers/service'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/update:
 *  put:
 *   tags: ["services"]
 *   summary: Update Service
 *   description: api used to update service
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: update service
 *        schema:
 *         type: object
 *         required:
 *          - service update
 *         properties:
 *           _id:
 *             type: string
 *             required:
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
    _id: Joi.string()
      .required()
      .label('Service Id'),
    title: Joi.string()
      .required()
      .label('Service title'),
    description: Joi.string()
      .label('Description')
  });

app.put(
  '/service/update',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  update
);

export default app;

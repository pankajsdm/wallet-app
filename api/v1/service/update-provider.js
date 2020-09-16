/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { updateProvider } from '../../../controllers/service'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/update:
 *  put:
 *   tags: ["Service Providers"]
 *   summary: Update service provider
 *   description: api used to update service provider
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: update service provider
 *        schema:
 *         type: object
 *         required:
 *          - service provider update
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
 *           status:
 *             type: number
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
      .label('Id'),
    title: Joi.string()
      .required()
      .label('Title'),
    description: Joi.string()
      .label('Description'),
    status: Joi.number()
      .label('Status')
  });

app.put(
  '/service/provider/update',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  updateProvider
);

export default app;

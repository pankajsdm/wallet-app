/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { updateProvider } from '../../../controllers/service'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
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
  *      - in: formData
 *        name: _id
 *        type: string
 *        required: true
 *      - in: formData
 *        name: title
 *        type: string
 *        required: true
 *      - in: formData
 *        name: description
 *        type: string
 *      - in: formData
 *        name: status
 *        type: number
 *      - in: formData
 *        name: translation
 *        type: string
 *      - in: formData
 *        name: file
 *        type: file
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const providerSchema = Joi.object({
    _id: Joi.string()
      .required()
      .label('Id'),
    title: Joi.string()
      .required()
      .label('Title'),
    description: Joi.string()
      .label('Description'),
    file: Joi.string()
      .label('Provider image'),
    translation: Joi.string()
      .label('Translation'),
    status: Joi.number()
      .label('Status')
  });

app.put(
  '/service/provider/update',
  validator.body(providerSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  updateProvider
);

export default app;

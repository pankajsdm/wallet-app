/*
 * @file: add.js
 * @description: Router is used to update service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { addProvider } from '../../../controllers/service'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/add:
 *  post:
 *   tags: ["Service Providers"]
 *   summary: add service provider
 *   description: api used to add service provider
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: formData
 *        name: serviceId
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
    serviceId: Joi.string()
      .required()
      .label('Service ID'),
    title: Joi.string()
      .required()
      .label('Provider title'),
    translation: Joi.string()
      .label('Translation'),
    description: Joi.string()
      .label('Provider Description'),
    file: Joi.string()
      .label('Provider image'),
  });

app.post(
  '/service/provider/add',
  validator.body(providerSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  addProvider
);

export default app;

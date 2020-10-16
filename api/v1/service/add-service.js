/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/service'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
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
 *      - in: formData
 *        name: title
 *        type: string
 *        required: true
 *      - in: formData
 *        name: description
 *        type: string
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


const serviceSchema = Joi.object({
    title: Joi.string()
      .required()
      .label('Service title'),
    description: Joi.string()
      .label('Description'),
    file: Joi.string()
      .label('Service Image'),
    translation: Joi.string()
      .label('Translation'),
  });

app.post(
  '/service/add',
  validator.body(serviceSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  add
);

export default app;

/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { update } from '../../../controllers/service'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/update:
 *  put:
 *   tags: ["Services"]
 *   summary: Update Service
 *   description: api used to update service
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


const userSchema = Joi.object({
    _id: Joi.string()
      .required()
      .label('Service Id'),
    title: Joi.string()
      .required()
      .label('Service title'),
    description: Joi.string()
      .label('Description'),
    file: Joi.object()
      .label('Service Image'),
    translation: Joi.string()
      .label('Translation'),
    status: Joi.number()
      .label('Status')
  });

app.put(
  '/service/update',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  update
);

export default app;

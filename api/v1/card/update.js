/*
 * @file: add.js
 * @description: Router is used to update card
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { update } from '../../../controllers/card'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/card/update:
 *  put:
 *   tags: ["Cards"]
 *   summary: Update virtual card 
 *   description: api used to update card
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
 *        required: true
 *      - in: formData
 *        name: feature
 *        type: string
 *        required: true
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


const cardSchema = Joi.object({
    _id: Joi.string()
      .required()
      .label('Card Id'),
    title: Joi.string()
      .required()
      .label('Title'),
    description: Joi.string()
      .required()
      .label('Description'),
    file: Joi.string()
      .label('Service Image'),
    feature: Joi.string()
      .required()
      .label('Feature'),
    status: Joi.number()
      .label('Status'),
    translation: Joi.string()
      .label('Translation'),
  });

app.put(
  '/card/update',
  validator.body(cardSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  update
);

export default app;

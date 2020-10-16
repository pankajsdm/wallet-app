/*
 * @file: add.js
 * @description: Router is used to add card
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/card'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/card/add:
 *  post:
 *   tags: ["Cards"]
 *   summary: Add virtual card 
 *   description: api used to add card
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
 *        required: true
 *      - in: formData
 *        name: feature
 *        type: string
 *        required: true
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
    title: Joi.string()
      .required()
      .label('Title'),
    description: Joi.string()
      .required()
      .label('Description'),
    file: Joi.string()
      .label('Card Image'),
    feature: Joi.string()
      .required()
      .label('Feature'),
    translation: Joi.string()
      .label('Translation'),
  });

app.post(
  '/card/add',
  validator.body(cardSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  add
);

export default app;

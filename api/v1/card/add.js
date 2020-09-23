/*
 * @file: add.js
 * @description: Router is used to add card
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/card'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
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
 *      - in: body
 *        name: user
 *        description: add card
 *        schema:
 *         type: object
 *         required:
 *          - virtual card params: 
 *         properties:  
 *           title:
 *            type: string
 *            required: 
 *           description:
 *             type: number
 *             required:
 *           file:
 *             type: object
 *           feature:
 *             type: string
 *             required:
 *           translation:
 *             type: array
 *             items:
 *               type: object
 *               description: required langulage params
 *               properties:
 *                 language:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const userSchema = Joi.object({
    title: Joi.string()
      .required()
      .label('Title'),
    description: Joi.string()
      .required()
      .label('Description'),
    file: Joi.object()
      .label('Service Image'),
    feature: Joi.string()
      .required()
      .label('Feature'),
    translation: Joi.string()
      .label('Translation'),
  });

app.post(
  '/card/add',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  add
);

export default app;

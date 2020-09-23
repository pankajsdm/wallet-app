/*
 * @file: add.js
 * @description: Router is used to update card
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { update } from '../../../controllers/card'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/card/update:
 *  post:
 *   tags: ["Cards"]
 *   summary: Update virtual card 
 *   description: api used to update card
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
 *           _id:
 *            type: string
 *            required: 
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
    _id: Joi.string()
      .required()
      .label('Card Id'),
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
  '/card/update',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  update
);

export default app;

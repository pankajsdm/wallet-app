/*
 * @file: add.js
 * @description: Router is used to add plan for provider
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { addProviderPlan } from '../../../controllers/service'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/plan/add:
 *  post:
 *   tags: ["Provider Plans"]
 *   summary: add plan for service provider
 *   description: api used to add plan for service provider
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Add plan for service provider
 *        schema:
 *         type: object
 *         required:
 *          - Service add
 *         properties:
 *          providerId:
 *             type: string
 *             required:
 *          title:
 *             type: string
 *             required:
 *          code:
 *             type: number
 *             required:
 *          price:
 *             type: number
 *             required:
 *          description:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const userSchema = Joi.object({
    providerId: Joi.string()
      .required()
      .label('Provider ID'),
    title: Joi.string()
      .required()
      .label('Provider title'),
    code: Joi.number()
      .required()
      .label('Scratch code'),
    price: Joi.number()
      .required()
      .label('Price'),
    description: Joi.string()
      .label('Description')
  });

app.post(
  '/service/provider/plan/add',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  addProviderPlan
);

export default app;

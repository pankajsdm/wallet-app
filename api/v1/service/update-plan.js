/*
 * @file: add.js
 * @description: Router is used to update plan for provider
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { updateProviderPlan } from '../../../controllers/service'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/plan/update:
 *  put:
 *   tags: ["Provider Plans"]
 *   summary: update plan for service provider
 *   description: api used to update plan for service provider
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: update plan for service provider
 *        schema:
 *         type: object
 *         required:
 *          - Update plan params: 
 *         properties:
 *          _id:
 *             type: string
 *             required:
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
 *          status:
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
      .label('Plan ID'),
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
      .label('Description'),
    status: Joi.number()
      .label('Status')
  });

app.put(
  '/service/provider/plan/update',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  updateProviderPlan
);

export default app;

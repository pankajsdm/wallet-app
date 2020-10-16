/*
 * @file: add.js
 * @description: Router is used to create scratch payment and redeemed.
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { create } from '../../../controllers/redeemed'
import { checkToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/redeem/create:
 *  post:
 *   tags: ["Coupon Redeemed"]
 *   summary: Buying particular provider plan and redeem the coupon code
 *   description: api used to payment and redeemed coupon code.
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Params for create payment and redeemed plan
 *        schema:
 *         type: object
 *         required:
 *          - Params for create payment and redeemed plan
 *         properties:
 *           _id:
 *            type: string
 *            required: 
 *           providerId:
 *            type: string
 *            required:  
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const userSchema = Joi.object({
  _id: Joi.string()
  .required()
  .label('Plan Id'),
  providerId: Joi.string()
    .required()
    .label('Provider Id'),
  });

app.post(
  '/service/redeem/create',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  create
);

export default app;

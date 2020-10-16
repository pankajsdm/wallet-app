/*
 * @file: add.js
 * @description: Router is used to add new commission
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/commission'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/commission/add:
 *  post:
 *   tags: ["Commissions"]
 *   summary: Add tax and commission
 *   description: api used to create tax and commission
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
 *        name: rate
 *        type: number
 *        required: true
 *      - in: formData
 *        name: description
 *        type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const commissionSchema = Joi.object({
    title: Joi.string()
      .required()
      .label('Commission title'),
    rate: Joi.number()
      .required()
      .label('Commission rate'),
    description: Joi.string()
      .label('Description'),
  });

app.post(
  '/commission/add',
  validator.body(commissionSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  add
);

export default app;

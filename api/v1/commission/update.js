/*
 * @file: add.js
 * @description: Router is used to update commission and tax
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { update } from '../../../controllers/commission'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/commission/update:
 *  put:
 *   tags: ["Commissions"]
 *   summary: Api use to update commission and tax
 *   description: Api use to update commission
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
    _id: Joi.string()
      .required()
      .label('Commission Id'),
    title: Joi.string()
      .required()
      .label('Commission title'),
    rate: Joi.number()
      .required()
      .label('Commission rate'),
    description: Joi.string()
      .label('Description'),
});

app.put(
  '/commission/update',
  validator.body(commissionSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  update
);

export default app;

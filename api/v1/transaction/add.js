/*
 * @file: add.js
 * @description: Router is used to add transaction
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/transaction'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/transaction/add:
 *  post:
 *   tags: ["Transaction"]
 *   summary: Add amount to particular user wallet
 *   description: api used to add amount to particular user wallet
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Add amount to particular user wallet
 *        schema:
 *         type: object
 *         required:
 *          - user add
 *         properties:
 *           userId:
 *            type: string
 *            required:   
 *           amount:
 *             type: number
 *             required:
 *           note:
 *             type: string
 *             required:
 *           type:
 *             type: number
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const transactionSchema = Joi.object({
    userId: Joi.string()
      .required()
      .label('User Id'),
    amount: Joi.number()
      .required()
      .label('Amount'),
    type: Joi.number()
      .required()
      .label('Type for add or substract'),
    note: Joi.string()
      .required()
      .label('Note')
  });

app.post(
  '/transaction/add',
  validator.body(transactionSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  add
);

export default app;

/*
 * @file: add.js
 * @description: Router is used to delete commission
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { deleteCommission } from '../../../controllers/commission'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/commission/delete/{id}:
 *  delete:
 *   tags: ["Commissions"]
 *   consumes:
 *    - multipart/form-data
 *   summary: Delete commission and tax
 *   description: api used to delete commission and tax
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true 
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: commission id
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


app.delete(
  '/commission/delete/:_id',
  checkToken,
  isAuthorizedUserForAction,
  deleteCommission
);

export default app;

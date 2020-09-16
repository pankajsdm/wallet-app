/*
 * @file: add.js
 * @description: Router is used to delete provider plan
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { deleteProviderPlan } from '../../../controllers/service'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/plan/delete/{id}/{providerId}:
 *  delete:
 *   tags: ["Provider Plans"]
 *   consumes:
 *    - multipart/form-data
 *   summary: Delete provider plan 
 *   description: api used to delete provider plan
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true 
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Required plan id
 *      - in: path
 *        name: providerId
 *        type: string
 *        required: true
 *        description: Required provider id
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


app.delete(
  '/service/provider/plan/delete/:_id/:providerId',
  checkToken,
  deleteProviderPlan
);

export default app;

/*
 * @file: get-list.js
 * @description: It fetch single provider plan router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getSingleProviderPlan } from '../../../controllers/service';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/plan/get/{planId}/{providerId}:
 *  get:
 *   tags: ["Provider Plans"]
 *   consumes:
 *    - multipart/form-data
 *   summary: get provider plan by id api
 *   description: api used to get single provider plan by id
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true 
 *      - in: path
 *        name: planId
 *        type: string
 *        required: true
 *      - in: path
 *        name: providerId
 *        type: string
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  '/service/provider/plan/get/:_id/:providerId',
  checkToken,
  getSingleProviderPlan
);

export default app;

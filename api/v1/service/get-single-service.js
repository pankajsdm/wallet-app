/*
 * @file: get-list.js
 * @description: It Contain get user list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getSingleService } from '../../../controllers/service';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/services/get-single-service:
 *  post:
 *   tags: ["services"]
 *   summary: get service by id api
 *   description: api used to get service by id
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: service
 *        description: Get single service by its id
 *        schema:
 *         type: object
 *         required:
 *          - get single service
 *         properties:
 *           _id:
 *             type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post(
  '/services/get-single-service',
  checkToken,
  getSingleService
);

export default app;

/*
 * @file: get-list.js
 * @description: It fetch single provider router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getSingleProvider } from '../../../controllers/service';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/get:
 *  post:
 *   tags: ["Service Providers"]
 *   summary: get provider by id api
 *   description: api used to get provider by id
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: service
 *        description: Get single provider by its id
 *        schema:
 *         type: object
 *         required:
 *          - get single provider
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
  '/service/provider/get',
  checkToken,
  getSingleProvider
);

export default app;

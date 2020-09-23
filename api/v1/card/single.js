/*
 * @file: get-list.js
 * @description: It Contain get card by id router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getSingleCard } from '../../../controllers/card';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/card/get:
 *  post:
 *   tags: ["Cards"]
 *   summary: get card by id api
 *   description: api used to get card by id
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: service
 *        description: Get single card by its id
 *        schema:
 *         type: object
 *         required:
 *          - get single card params:
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
  '/card/get',
  checkToken,
  getSingleCard
);

export default app;

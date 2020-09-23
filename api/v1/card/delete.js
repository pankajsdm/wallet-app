/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { deleteCard } from '../../../controllers/card'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/card/delete/{id}:
 *  delete:
 *   tags: ["Cards"]
 *   consumes:
 *    - multipart/form-data
 *   summary: delete card api
 *   description: api used to delete card
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: The delete card router.
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


app.delete(
  '/card/delete/:_id',
  checkToken,
  deleteCard
);

export default app;

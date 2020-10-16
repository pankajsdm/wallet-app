/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { deleteService } from '../../../controllers/service'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/delete/{id}:
 *  delete:
 *   tags: ["Services"]
 *   consumes:
 *    - multipart/form-data
 *   summary: delete file api
 *   description: api used to delete service
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
 *        description: The delete files router.
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


app.delete(
  '/service/delete/:_id',
  checkToken,
  isAuthorizedUserForAction,
  deleteService
);

export default app;

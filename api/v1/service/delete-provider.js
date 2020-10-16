/*
 * @file: add.js
 * @description: Router is used to delete service provider
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { deleteProvider } from '../../../controllers/service'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/delete/{id}:
 *  delete:
 *   tags: ["Service Providers"]
 *   consumes:
 *    - multipart/form-data
 *   summary: Delete service provider 
 *   description: api used to delete service provider
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
*      - in: path
 *        name: id
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
  '/service/provider/delete/:_id',
  checkToken,
  isAuthorizedUserForAction,
  deleteProvider
);

export default app;

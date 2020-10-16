/*
 * @file: add.js
 * @description: Router is used to delete report submitted by user
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { deleteReport } from '../../../controllers/report'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/report/{id}:
 *  delete:
 *   tags: ["Reports"]
 *   consumes:
 *    - multipart/form-data
 *   summary: Delete report submitted by user
 *   description: api used to delete report submitted by user
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true 
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Report id
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


app.delete(
  '/report/:_id',
  checkToken,
  isAuthorizedUserForAction,
  deleteReport
);

export default app;

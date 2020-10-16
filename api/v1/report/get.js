/*
 * @file: get-list.js
 * @description: It contain get report list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { view } from '../../../controllers/report';
import { checkToken, forAdminPrivilegeToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/report/get/{id}:
 *  get:
 *   tags: ["Reports"]
 *   consumes:
 *    - multipart/form-data
 *   summary: Admin can get report by Id
 *   description: api used to get report by id
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
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  '/report/get/:_id',
  checkToken,
  forAdminPrivilegeToken,
  view
);

export default app;

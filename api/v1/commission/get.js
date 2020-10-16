/*
 * @file: get-list.js
 * @description: It contain get commission list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getCommission } from '../../../controllers/commission';
import { checkToken, forAdminPrivilegeToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/commission/get/{id}:
 *  get:
 *   tags: ["Commissions"]
 *   consumes:
 *    - multipart/form-data
 *   summary: Admin can get commission by Id
 *   description: api used to get commission by id
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
  '/commission/get/:_id',
  checkToken,
  forAdminPrivilegeToken,
  getCommission
);

export default app;

/*
 * @file: connect - account.js
 * @description: It Contain user connect account  info router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { addConnectAccountDetail } from '../../../controllers/user';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/createConnectAccount:
 *  post:
 *   tags: ["user"]
 *   summary: Create Connect Account
 *   description: api used to Create Connect Account
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Create Connect Account.
 *        schema:
 *         type: object
 *         required:
 *          - Connect Account Info
 *         properties:
 *           account_holder_name:
 *             type: string
 *             required:
 *           account_number:
 *             type: string
 *             required:
 *           routing_number:
 *             type: string




 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  account_holder_name: Joi.string()
    .required()
    .label('account_holder_name'),
  account_number: Joi.string()
    .required()
    .label('account_number'),
  routing_number: Joi.string()
    .optional()
    .allow('')
    .label('routing_number')
});

app.post(
  '/user/createConnectAccount',
  decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  addConnectAccountDetail
);

export default app;

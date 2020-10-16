/*
 * @file: logout.js
 * @description: It Contain logout router/api.
 * @author: Pankaj Pandey
 */
 
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { updateDeviceToken } from '../../../controllers/user';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/updateDeviceToken:
 *  post:
 *   tags: ["Users"]
 *   summary: user device token update  api
 *   description: api used to update device token
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: update users info.
 *        schema:
 *         type: object
 *         required:
 *          - user add
 *         properties:
 *           deviceToken:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  deviceToken: Joi.string()
    .required()
    .label('deviceToken')
});

app.post(
  '/user/updateDeviceToken',
  decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  updateDeviceToken
);

export default app;

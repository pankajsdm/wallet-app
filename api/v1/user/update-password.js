/*
 * @file: update-password.js
 * @description: It Contain update password router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { updatePassword } from '../../../controllers/user';
import { checkToken, decryptDataApi } from '../../../utilities/universal';

const validator = createValidator({ passError: true });
const app = express();

/**
 * @swagger
 * /api/v1/user/password:
 *  put:
 *   tags: ["user"]
 *   summary: user password update api
 *   description: api used to update user password
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: api used to update user password
 *        schema:
 *         type: object
 *         required:
 *          - user password
 *         properties:
 *           password:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  password: Joi.string()
    .trim()
    .required()
    .label('Password')
});

app.put(
  '/user/password',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  updatePassword
);

export default app;

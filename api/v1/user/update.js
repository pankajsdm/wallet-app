/*
 * @file: update.js
 * @description: It Contain update router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { updateUser } from '../../../controllers/user';
import { checkToken, decryptDataApi } from '../../../utilities/universal';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user:
 *  put:
 *   tags: ["user"]
 *   summary: user info update api
 *   description: api used to update users info 1 => Accept
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
 *           terms_aggrement_verified:
 *             type: number
 *             required:

 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  terms_aggrement_verified: Joi.number()
    .valid(1)
    .required()
    .label('terms_aggrement_verified')
});

app.put(
  '/user',
  decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  updateUser
);

export default app;

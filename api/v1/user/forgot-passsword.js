/*
 * @file: forgot-password.js
 * @description: It Contain forgot password router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { forgotPassword } from '../../../controllers/user';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/forgot-password:
 *  put:
 *   tags: ["Users"]
 *   summary: send forgot pasword link api
 *   description: api used to send forgot password link in email.
 *   parameters:
 *      - in: body
 *        name: user
 *        description: Send forgot password to get link in email.
 *        schema:
 *         type: object
 *         required:
 *          - user password
 *         properties:
 *           email:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .label('Email')
});

app.put(
  '/user/forgot-password',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  forgotPassword
);

export default app;

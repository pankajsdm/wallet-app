/*
 * @file: login.js
 * @description: It Contain login router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { chatbot_login } from '../../../controllers/user';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
import { DEVICE, ROLE } from '../../../utilities/constants';
const app = express();
const validator = createValidator({ passError: true });
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * 
 * /api/v1/user/chatbot_login:
 *  post:
 *   tags: ["Users"]
 *   summary: user chatbot_login api
 *   description: api used to login users by chatbot
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to login by chatbot.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           email:
 *             type: string
 *             required:
 *           deviceToken:
 *             type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .label('Email'),
  deviceToken: Joi.string()
    .optional()
    .allow('')
    .label('deviceToken')
});

app.post(
  '/user/chatbot_login',
  decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  chatbot_login
);

export default app;

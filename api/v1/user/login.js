/*
 * @file: login.js
 * @description: It Contain login router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { login } from '../../../controllers/user';
import { DEVICE, ROLE } from '../../../utilities/constants';
const app = express();
const validator = createValidator({ passError: true });
import { decryptDataApi } from '../../../utilities/universal';

// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/user/login:
 *  post:
 *   tags: ["user"]
 *   summary: User login api
 *   description: api used to login
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to login.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *           role:
 *             type: number
 *             required:
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
  password: Joi.string()
    .trim()
    .required()
    .label('Password'),
  role: Joi.number()
    .required()
    .allow('')
    .valid(ROLE.ADMIN, ROLE.CENTRALOFFICEUSER, ROLE.MARKEDLOCATIONUSER)
    .label('Role')
});

app.post(
  '/user/login',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  login
);



export default app;

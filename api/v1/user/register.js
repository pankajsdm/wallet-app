/*
 * @file: update.js
 * @description: It Contain update router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { registerUser } from '../../../controllers/user';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
import { ROLE } from '../../../utilities/constants';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/register:
 *  post:
 *   tags: ["Users"]
 *   summary: Register user
 *   description: api used to register the user
 *   parameters:
 *      - in: body
 *        name: user
 *        description: Register new user
 *        schema:
 *         type: object
 *         required:
 *          - user add
 *         properties:
 *           email:
 *             type: string
 *             required:
 *           username:
 *             type: string
 *             required:
 *           mobile:
 *               type: object
 *               description: mobile number
 *               properties:
 *                 code:
 *                   type: string
 *                 number:
 *                   type: string
 *           password:
 *             type: string
 *             required:
 *           role:
 *             type: number
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
    username: Joi.string()
      .required()
      .label('User name'),
    mobile: Joi.object({
      code: Joi.string().required().label('Code'),
      number: Joi.string().required().label('Mobile No'),
    }),
    password: Joi.string()
      .required()
      .label('Password'),
    role: Joi.number()
      .required()
      .valid(ROLE.CENTRALOFFICEUSER, ROLE.MARKEDLOCATIONUSER, ROLE.SUBSCRIBER)
      .label('Role')
  });

app.post(
  '/user/register',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  registerUser
);

export default app;

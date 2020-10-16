/*
 * @file: update.js
 * @description: It Contain update router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { createUser } from '../../../controllers/user';
import { checkToken, forAdminPrivilegeToken } from '../../../utilities/universal';
import { ROLE } from '../../../utilities/constants';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/add:
 *  post:
 *   tags: ["Users"]
 *   summary: Api for create new user by admin only
 *   description: api parameter form data inputs to create new user by admin
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: formData
 *        name: role
 *        type: number
 *        required: true
 *      - in: formData
 *        name: email
 *        type: string
 *        required: true
 *      - in: formData
 *        name: locationId
 *        type: string
 *      - in: formData
 *        name: username
 *        type: string
 *        required: true
 *      - in: formData
 *        name: password
 *        type: string
 *        required: true
 *      - in: formData
 *        name: firstName
 *        type: string
 *        required: true
 *      - in: formData
 *        name: lastName
 *        type: string
 *        required: true
 *      - in: formData
 *        name: city
 *        type: string
 *        required: true
 *      - in: formData
 *        name: state
 *        type: string
 *        required: true
 *      - in: formData
 *        name: country
 *        type: string
 *        required: true
 *      - in: formData
 *        name: address
 *        type: string
 *      - in: formData
 *        name: mobile
 *        type: string
 *        required: true
 *      - in: formData
 *        name: file
 *        type: file
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
    password: Joi.string()
      .required()
      .label('Password'),
    firstName: Joi.string()
      .required()
      .label('First name'),
    lastName: Joi.string()
      .required()
      .label('Last name'),
    city: Joi.string()
      .required()
      .label('City'),
    state: Joi.string()
      .required()
      .label('State'),
    country: Joi.string()
      .required()
      .label('Country'),
    address: Joi.string()
      .label('Address'),
    mobile: Joi.string()
      .required()  
      .label('Mobile number'),
    role: Joi.number()
      .required()
      .valid(ROLE.ADMIN, ROLE.CENTRALOFFICEUSER, ROLE.MARKEDLOCATIONUSER, ROLE.SUBSCRIBER)
      .label('Role'),
    locationId: Joi.string()
      .label('Location Id'),
  });

app.post(
  '/user/add',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  forAdminPrivilegeToken,
  createUser
);

export default app;

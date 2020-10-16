/*
 * @file: logout.js
 * @description: It Contain update user router
 * @author: Pankaj Pandey
 */
 
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { ROLE } from './../../../utilities/constants';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
import { updateUser } from '../../../controllers/user';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/update:
 *  put:
 *   tags: ["Users"]
 *   summary: user update along with basic information
 *   description: api used to update user
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: formData
 *        name: email
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
 *        name: countryCode
 *        type: number
 *      - in: formData
 *        name: mobile
 *        type: number
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
      .label('Email'),
    countryCode: Joi.number()
      .label('Country code'),
    mobile: Joi.number()
      .label('Mobile number'),
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
      .label('City'),
    country: Joi.string()
      .required()
      .label('City'),
    address: Joi.string()
      .required()
      .label('City'),
    file: Joi.string()
      .label('Profile picture'),
  });

app.put(
  '/user/update',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  updateUser
);

export default app;

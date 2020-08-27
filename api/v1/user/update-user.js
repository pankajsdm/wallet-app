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
 * /api/v1/user/updateUser:
 *  post:
 *   tags: ["user"]
 *   summary: user update along with basic information
 *   description: api used to update user
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
 *           firstName:
 *             type: string
 *             required:
 *           lastName:
 *             type: string
 *             required:
 *           city:
 *             type: string
 *             required:
 *           state:
 *             type: string
 *             required:
 *           country:
 *             type: string
 *             required:
 *           address:
 *             type: string
 *           file:
 *             type: object
 *           kyc:
 *             type: array
 *             items:
 *               type: object
 *               description: document upload
 *               properties:
 *                 type:
 *                   type: string
 *                 doc:
 *                   type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
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

app.post(
  '/user/updateUser',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  updateUser
);

export default app;

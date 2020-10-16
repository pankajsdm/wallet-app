/*
 * @file: get-list.js
 * @description: It Contain get user list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getList } from '../../../controllers/user';
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
import { ROLE } from '../../../utilities/constants';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/lists:
 *  post:
 *   tags: ["Users"]
 *   summary: users list api
 *   description: api used to get users list in admin panel <br/> <b>Note:-</b> <br/> <b>role</b> can be one of 2 => Doctor, 3 => Patients.
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: The user filter list.
 *        schema:
 *         type: object
 *         properties:
 *           search:
 *             type: string
 *           role:
 *             type: number
 *           page:
 *             type: number
 *           limit:
 *             type: number
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */
const userSchema = Joi.object({
  search: Joi.string()
    .optional()
    .allow('')
    .label('Search'),
  role: Joi.array()
    .optional()
    .label('User role'),
  page: Joi.number()
    .label('Page Number'),
  limit: Joi.number()
    .required()
    .label('User Status'),
});


app.post(
  '/user/lists',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  getList
);

export default app;

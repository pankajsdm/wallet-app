/*
 * @file: get-list.js
 * @description: It Contain get user list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getList } from '../../../controllers/user';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
import { ROLE } from '../../../utilities/constants';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user:
 *  post:
 *   tags: ["user"]
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
 *           page:
 *             type: number
 *             required:
 *           status:
 *             type: number
 *           paymentInfo:
 *             type: number
 *           role:
 *             type: number
 *             required:
 *           dateRange:
 *             type: object
 *           speciality:
 *             type: string
 *           location:
 *            schema:
 *            type: object
 *            properties:
 *             coordinates:
 *              type: array
 *              items:
 *                type: number
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
  page: Joi.number()
    .required()
    .label('Page Number'),
  status: Joi.number()
    .optional()
    .label('User Status'),
  paymentInfo: Joi.number()
    .optional()
    .label('paymentInfo'),
  role: Joi.number()
    .valid(ROLE.CENTRALOFFICEUSER, ROLE.MARKEDLOCATIONUSER)
    .required()
    .label('Role'),
  dateRange: Joi.object()
    .optional()
    .allow(null, '')
    .label('Created Range'),
  speciality: Joi.string()
    .optional()
    .allow(null, '')
    .label('speciality'),
  /* location: Joi.object({
    coordinates: Joi.array()
      .items(Joi.number(), Joi.number())
      .min(2)
      .max(2)
  })
  .optional()
  .allow('')
  .label('Location') */

});


app.post(
  '/user',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  getList
);

export default app;

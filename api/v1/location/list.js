/*
 * @file: list.js
 * @description: It contain location list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getLists } from '../../../controllers/location';
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/location/lists:
 *  post:
 *   tags: ["Locations"]
 *   summary: Getting the location list
 *   description: api used to get list of the services
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: The services filter list.
 *        schema:
 *         type: object
 *         properties:
 *           search:
 *             type: string
 *           role:
 *             type: number
 *           page:
 *             type: number
 *             required:
 *           limit:
 *             type: number
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */
const serviceSchema = Joi.object({
  search: Joi.string()
    .optional()
    .allow('')
    .label('Search'),
  role: Joi.number()
    .optional()
    .label('Office role'),
  page: Joi.number()
    .required()
    .label('Page Number'),
  limit: Joi.number()
    .required()
    .label('Limit'),
});


app.post(
  '/location/lists',
  validator.body(serviceSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  isAuthorizedUserForAction,
  getLists
);

export default app;

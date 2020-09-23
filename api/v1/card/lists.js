/*
 * @file: list-services.js
 * @description: It Contain get service list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getLists } from '../../../controllers/card';
import { checkToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/card/lists:
 *  post:
 *   tags: ["Cards"]
 *   summary: Getting the card list
 *   description: api used to get list of the card
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: The card filter list.
 *        schema:
 *         type: object
 *         properties:
 *           search:
 *             type: string
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
  page: Joi.number()
    .required()
    .label('Page Number'),
  limit: Joi.number()
    .required()
    .label('Limit'),
});


app.post(
  '/card/lists',
  validator.body(serviceSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  getLists
);

export default app;

/*
 * @file: get-services.js
 * @description: It Contain get user list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getLists } from '../../../controllers/service';
import { checkToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/lists:
 *  post:
 *   tags: ["services"]
 *   summary: Getting the services list
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
 *           page:
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
    .label('Page Number')
});


app.post(
  '/service/lists',
  //decryptDataApi,
  /* validator.body(serviceSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken, */
  (req, res, next) =>{
    console.log("I am posting for getting service list")
  }
);

export default app;

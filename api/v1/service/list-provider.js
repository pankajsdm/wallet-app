/*
 * @file: get-services.js
 * @description: It contain get provider list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getProviders } from '../../../controllers/service';
import { checkToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/lists:
 *  post:
 *   tags: ["Service Providers"]
 *   summary: Getting the provider list
 *   description: api used to get list of the provider
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: The provider filter list.
 *        schema:
 *         type: object
 *         properties:
 *           serviceId:
 *             type: string
 *             required:
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
  serviceId: Joi.string()
    .required()
    .label('Service Id'),
  search: Joi.string()
    .optional()
    .allow('')
    .label('Search'),
  page: Joi.number()
    .required()
    .label('Page Number'),
  limit: Joi.number()
    .required()
    .label('Limit')
});


app.post(
  '/service/provider/lists',
  validator.body(serviceSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  getProviders
);

export default app;

/*
 * @file: get-list.js
 * @description: It fetch  list of  provider plan router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { listProviderPlan } from '../../../controllers/service';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/plan/lists:
 *  post:
 *   tags: ["Provider Plans"]
 *   summary: get  list of provider plan  api
 *   description: api used to get list of provider plan by id
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: service
 *        description: Get  list of provider plan
 *        schema:
 *         type: object
 *         required:
 *          - get list of provider plan params
 *         properties:
 *           providerId:
 *             type: string
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

const planSchema = Joi.object({
  providerId: Joi.string()
    .required()
    .label('Provider Id'),
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
  '/service/provider/plan/lists',
  validator.body(planSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  listProviderPlan
);

export default app;

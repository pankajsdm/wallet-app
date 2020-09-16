/*
 * @file: get-list.js
 * @description: It fetch single provider plan router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getSingleProviderPlan } from '../../../controllers/service';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/plan/get:
 *  post:
 *   tags: ["Provider Plans"]
 *   summary: get provider plan by id api
 *   description: api used to get single provider plan by id
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: service
 *        description: Get single provider plan by its id
 *        schema:
 *         type: object
 *         required:
 *          - get single provider plan
 *         properties:
 *           _id:
 *             type: string
 *           providerId:
 *             type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const planSchema = Joi.object({
    _id: Joi.string()
      .required()
      .label('Plan Id'),
    providerId: Joi.string()
      .required()
      .label('Provider Id')
});

app.post(
  '/service/provider/plan/get',
  validator.body(planSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  getSingleProviderPlan
);

export default app;

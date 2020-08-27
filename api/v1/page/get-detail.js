/*
 * @file: get-detail.js
 * @description: It Contain register get detail of page by slug router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getDetailByType } from '../../../controllers/page';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/page/{type}:
 *  get:
 *   tags: ["page"]
 *   summary: get page detail by type api
 *   description: api used to get page detail by type api
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: path
 *        name: type
 *        type: string
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const pageSchema = Joi.object({
  type: Joi.string()
    .trim()
    .required()
    .label('Slug')
});

app.get(
  '/page/:type',
  validator.params(pageSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  getDetailByType
);

export default app;

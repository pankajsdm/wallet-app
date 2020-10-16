/*
 * @file: update.js
 * @description: It Contain register update page  router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { update } from '../../../controllers/page';
import { checkToken, decryptDataApi } from '../../../utilities/universal';

const app = express();
const validator = createValidator({ passError: true });

/**
 * 
 * /api/v1/page:
 *  put:
 *   tags: ["Pages"]
 *   summary: update page api
 *   description: api used to update page
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: page
 *        description: The page to update in admin.
 *        schema:
 *         type: object
 *         required:
 *          - update page
 *         properties:
 *           id:
 *             type: string
 *             required:
 *           title:
 *             type: string
 *           content:
 *             type: string
 *           status:
 *             type: boolean
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const pageSchema = Joi.object({
  id: Joi.string()
    .trim()
    .required()
    .label('Page Id'),
  title: Joi.string()
    .trim()
    .optional()
    .label('Page title'),
  content: Joi.string()
    .trim()
    .optional()
    .label('Page Content'),
  status: Joi.boolean()
    .optional()
    .valid(true, false)
    .label('Page Status')
});

app.put(
  '/page',
  decryptDataApi,
  validator.body(pageSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  update
);

export default app;

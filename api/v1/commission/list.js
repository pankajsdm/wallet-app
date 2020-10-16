/*
 * @file: list.js
 * @description: It contain get commission list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getLists } from '../../../controllers/commission';
import { checkToken, forAdminPrivilegeToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/commission/lists:
 *  post:
 *   tags: ["Commissions"]
 *   summary: View the list of tax and commissions
 *   description: Api used to get list of tax and commissions
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: The report filter list.
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
const reportSchema = Joi.object({
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
  '/commission/lists',
  validator.body(reportSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  forAdminPrivilegeToken,
  getLists
);

export default app;

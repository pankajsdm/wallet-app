/*
 * @file: add.js
 * @description: It Contain register add page  router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/page';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
import { PAGE_TYPE } from '../../../utilities/constants';

const app = express();
const validator = createValidator({ passError: true });

/**
 * 
 * /api/v1/page:
 *  post:
 *   tags: ["Pages"]
 *   summary: create page api
 *   description: api used to add page <br/><b>Note:-</b><br/>Page type should be one of about-us, contact-us, privacy-policy, terms-conditions
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: page
 *        description: The page to add in admin.
 *        schema:
 *         type: object
 *         required:
 *          - add page
 *         properties:
 *           title:
 *             type: string
 *             required:
 *           content:
 *             type: string
 *             required:
 *           type:
 *             type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const pageSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .label('Page title'),
  content: Joi.string()
    .trim()
    .required()
    .label('Page Content'),
  type: Joi.string()
    .optional()
    .valid(
      PAGE_TYPE.ABOUT_US,
      PAGE_TYPE.CONTACT_US,
      PAGE_TYPE.PRIVACY_POLICY,
      PAGE_TYPE.TERMS_CONDITIONS
    )
    .label('Page Type')
});

app.post(
  '/page',
  //decryptDataApi,
  validator.body(pageSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  add
);

export default app;

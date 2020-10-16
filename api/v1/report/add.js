/*
 * @file: add.js
 * @description: Router is used to add new report
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/report'
import { checkToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/report/add:
 *  post:
 *   tags: ["Reports"]
 *   summary: submit report by app user to admin
 *   description: api used to create report by app user
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: formData
 *        name: subject
 *        type: string
 *        required: true
 *      - in: formData
 *        name: description
 *        type: string
 *      - in: formData
 *        name: file
 *        type: file
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const reportSchema = Joi.object({
    subject: Joi.string()
      .required()
      .label('Subject'),
    description: Joi.string()
      .label('description'),
    file: Joi.string()
      .label('Attachment'),
  });

app.post(
  '/report/add',
  validator.body(reportSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  add
);

export default app;

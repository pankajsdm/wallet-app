/*
 * @file: delete.js
 * @description: It Contain register delete file  router/api.
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { checkToken } from '../../../utilities/universal';
import { deleteFile } from '../../../controllers/gallery';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/file/{id}:
 *  delete:
 *   tags: ["file"]
 *   consumes:
 *    - multipart/form-data
 *   summary: delete file api
 *   description: api used to delete file
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: The delete files router.
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const fileSchema = Joi.object({
  id: Joi.string()
    .trim()
    .required()
    .label('File Id')
});

app.delete(
  '/file/:id',
  validator.params(fileSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  deleteFile
);

export default app;

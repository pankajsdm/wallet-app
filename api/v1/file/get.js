/*
 * @file: get.js
 * @description: It Contain register get file  router/api.
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getFile } from '../../../controllers/gallery';
import { FILE_TYPE } from '../../../utilities/constants';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/file/{fileType}/{id}:
 *  get:
 *   tags: ["file"]
 *   consumes:
 *    - multipart/form-data
 *   summary: get file api
 *   description: api used to get file <br/><b>Note:-</b><br/><b>fileType</b> must be one of original OR thumbnail
 *   parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: The file id.
 *      - in: path
 *        name: fileType
 *        type: string
 *        required: true
 *        description: The files type original OR thumbnail.
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const fileSchema = Joi.object({
  id: Joi.string()
    .required()
    .allow('')
    .label('File id'),
  fileType: Joi.string()
    .required()
    .valid(FILE_TYPE.original, FILE_TYPE.thumbnail)
    .label('File Type')
});

app.get(
  '/file/:fileType/:id',
  validator.params(fileSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  getFile
);

export default app;

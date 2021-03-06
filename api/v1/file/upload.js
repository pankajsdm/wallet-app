/*
 * @file: upload.js
 * @description: It Contain register file upload  router/api.
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { checkToken } from '../../../utilities/universal';
import { fileUpload } from '../../../controllers/gallery';
import { FOLDER_TYPE } from '../../../utilities/constants';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/file/{type}:
 *  post:
 *   tags: ["file"]
 *   consumes:
 *    - multipart/form-data
 *   summary: file upload api
 *   description: api used to upload file. <br/><b>Note:-</b> Type Should be one of "chatMedia", "profile_pic", "idp"
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: path
 *        name: type
 *        type: string
 *        required: true
 *      - in: formData
 *        name: file
 *        type: file
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const fileSchema = Joi.object({
  type: Joi.string()
    .required()
    .valid(
      FOLDER_TYPE.chat,
      FOLDER_TYPE.profile,
      FOLDER_TYPE.idp
    )
    .label('Folder type')
});

app.post(
  '/file/:type',
  validator.params(fileSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  fileUpload
);

export default app;

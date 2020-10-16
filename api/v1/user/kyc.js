/*
 * @file: logout.js
 * @description: Update user kyc document
 * @author: Pankaj Pandey
 */
 
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
import { updateKYC } from '../../../controllers/user';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user/kyc:
 *  post:
 *   tags: ["Users"]
 *   summary: upload the document for kyc
 *   description: api used to upload the document for kyc
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: formData
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

const userSchema = Joi.object({
    type: Joi.string()
      .required()
      .label('Document type'),
    file: Joi.string()
      .required()
      .label('Document')
  });

app.post(
  '/user/kyc',
  checkToken,
  updateKYC
);



export default app;

/*
 * @file: add.js
 * @description: Router is used to add new service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/service'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/add:
 *  post:
 *   tags: ["Services"]
 *   summary: Add Service
 *   description: api used to add new service
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Add new service
 *        schema:
 *         type: object
 *         required:
 *          - user add
 *         properties:
 *           title:
 *             type: string
 *             required:
 *           description:
 *             type: string
 *             required:
 *           file:
 *             type: object
 *           translation:
 *             type: array
 *             items:
 *               type: object
 *               description: required langulage params
 *               properties:
 *                 language:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const serviceSchema = Joi.object({
    title: Joi.string()
      .required()
      .label('Service title'),
    description: Joi.string()
      .label('Description'),
    file: Joi.object()
      .label('Service Image'),
    translation: Joi.string()
      .label('Translation'),
    /* translation: Joi.array().items(
      Joi.object({
        language: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
      })
    ) */
  });

app.post(
  '/service/add',
  //decryptDataApi,
  validator.body(serviceSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  add
);

export default app;

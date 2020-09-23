/*
 * @file: add.js
 * @description: Router is used to update service
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { addProvider } from '../../../controllers/service'
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/service/provider/add:
 *  post:
 *   tags: ["Service Providers"]
 *   summary: add service provider
 *   description: api used to add service provider
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Add service provider
 *        schema:
 *         type: object
 *         required:
 *          - Service add
 *         properties:
 *          serviceId:
 *             type: string
 *             required:
 *          title:
 *             type: string
 *             required:
 *          description:
 *             type: string
 *             required:
 *          file:
 *             type: object
 *          translation:
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


const userSchema = Joi.object({
    serviceId: Joi.string()
      .required()
      .label('Service ID'),
    title: Joi.string()
      .required()
      .label('Provider title'),
    translation: Joi.string()
      .label('Translation'),
    /* translation: Joi.array().items(
        Joi.object({
          language: Joi.string().required(),
          title: Joi.string().required(),
          description: Joi.string().required(),
        })
    ), */
    description: Joi.string()
      .label('Provider Description'),
    file: Joi.object()
      .label('Provider image'),
  });

app.post(
  '/service/provider/add',
  //decryptDataApi,
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  addProvider
);

export default app;

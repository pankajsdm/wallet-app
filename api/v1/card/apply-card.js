/*
 * @file: apply-card.js
 * @description: Router is used to apply for particular card
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { apply } from '../../../controllers/card'
import { checkToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/card/apply:
 *  post:
 *   tags: ["Cards"]
 *   summary: Apply virtual card for app user 
 *   description: Api for apply virtual card for app user 
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: formData
 *        name: cardId
 *        type: string
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


const applyCardSchema = Joi.object({
    cardId: Joi.string()
      .required()
      .label('Card Id'),
  });

app.post(
  '/card/apply',
  validator.body(applyCardSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  apply
);

export default app;

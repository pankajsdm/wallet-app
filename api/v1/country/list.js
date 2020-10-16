/*
 * @file: list.js
 * @description: It contain country list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getCountryLists } from '../../../controllers/location';
import { checkToken } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/country/lists:
 *  get:
 *   tags: ["Countries"]
 *   summary: Getting the list of countries
 *   description: api used to get list of countries
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
  '/country/lists',
  checkToken,
  getCountryLists
);

export default app;

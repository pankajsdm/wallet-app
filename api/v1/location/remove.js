/*
 * @file: remove.js
 * @description: Router is used to remove location
 * @author: Pankaj Pandey
 */

import express from 'express';
import { createValidator } from 'express-joi-validation';
import { deleteLocation } from '../../../controllers/location'
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/location/delete/{id}:
 *  delete:
 *   tags: ["Locations"]
 *   consumes:
 *    - multipart/form-data
 *   summary: delete location api
 *   description: api used to delete location
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
 *        description: Delete location
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */


app.delete(
  '/location/delete/:_id',
  checkToken,
  isAuthorizedUserForAction,
  deleteLocation
);

export default app;

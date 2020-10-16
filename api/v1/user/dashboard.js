/*
 * @file: get-list.js
 * @description: It contain the router of dashboard listing
 * @author: Pankaj Pandey
 */
import express from 'express';
import { getDashboardListing } from '../../../controllers/dashboard';
import { checkToken } from '../../../utilities/universal';
const app = express();
/**
 * @swagger
 * /api/v1/user/dashboard/listing:
 *  get:
 *   tags: ["Users"]
 *   summary: Api for listing required section in user dashboard 
 *   description: api used to listing required section
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
    '/user/dashboard/listing', 
    checkToken,
    getDashboardListing
);
export default app;

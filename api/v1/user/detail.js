/*
 * @file: get-list.js
 * @description: It Contain get user list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { getDetail } from '../../../controllers/user';
import { checkToken, decryptDataApi } from '../../../utilities/universal';
const app = express();
/**
 * @swagger
 * /api/v1/user/get/{id}:
 *  get:
 *   tags: ["Users"]
 *   consumes:
 *    - multipart/form-data
 *   summary: Api is used to get the user detail by id
 *   description: api used to get particular user detail
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true 
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.get(
    '/user/get/:_id', 
    checkToken, 
    getDetail
);
export default app;

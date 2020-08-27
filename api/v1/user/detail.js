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
 * /api/v1/user/detail:
 *  post:
 *   tags: ["user"]
 *   summary: users detail api
 *   description: api used to get users detail.
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: api used to get user detail
 *        schema:
 *         type: object
 *         required:
 *          - user id
 *         properties:
 *           userId:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post(
    '/user/detail', 
    checkToken, 
    //decryptDataApi, 
    getDetail
);
export default app;

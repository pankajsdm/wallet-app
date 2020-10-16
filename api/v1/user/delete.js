/*
 * @file: get-list.js
 * @description: It Contain get user list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { deleteUser } from '../../../controllers/user';
import { checkToken, isAuthorizedUserForAction } from '../../../utilities/universal';
const app = express();
/**
 * @swagger
 * /api/v1/user/delete/{id}:
 *  delete:
 *   tags: ["Users"]
 *   consumes:
 *    - multipart/form-data
 *   summary: Api is used to delete particular user
 *   description: api used to delete user
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

app.delete(
    '/user/delete/:_id', 
    checkToken, 
    isAuthorizedUserForAction,
    deleteUser
);
export default app;

/*
 * @file: get-list.js
 * @description: It Contain get user list router/api.
 * @author: pankaj pandey
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { chatbotDetail } from '../../../controllers/chatbot';
const app = express();
const validator = createValidator({ passError: true });
import { checkToken, decryptDataApi } from '../../../utilities/universal';
/**
 * @swagger
 * /api/v1/chatbot/chatinfo:
 *  post:
 *   tags: ["chatbot"]
 *   summary: chatbot detail api
 *   description: api used to get chatbot detail.
 *   parameters:
 *      - in: body
 *        name: chatbot
 *        description: The chat with chatbot.
 *        schema:
 *         type: object
 *         required:
 *          - user register
 *         properties:
 *           message:
 *             type: string
 *             required: true
 *           sessionId:
 *             type: string
 *             required:
 *           context:
 *             type: string
 *             required:
 *           data:
 *             type: object
 *             required:           
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

app.post('/chatbot/chatinfo', decryptDataApi, chatbotDetail);

export default app;

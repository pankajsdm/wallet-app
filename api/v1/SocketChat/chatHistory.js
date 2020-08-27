/*
 * @file: chatHistory.js
 * @description: It Contain chat history router/api.
 * @author: Saks
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { checkToken, decryptDataApi } from "../../../utilities/universal";
import { chatHistory } from "../../../controllers/chat-history";
const app = express();
const validator = createValidator({ passError: true });
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * @swagger
 * /api/v1/chatHistory:
 *  post:
 *   tags: ["SocketChat"]
 *   summary: User chat history API
 *   description: get history of chat between users
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: get history of chat between users
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           limit_count:
 *             type: number
 *             required:
 *           skip_count:
 *             type: number
 *             required:
 *           appointmentId:
 *             type: string
 *           roomId:
 *             type: string
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const chatHistorySchema = Joi.object({
  limit_count: Joi.number().required().label("Limit count"),
  skip_count: Joi.number().required().label("Skip count"),
  appointmentId: Joi.string().optional().allow('').label("Appointment Id "),
  roomId: Joi.string().optional().allow('').label("Room ID")
});

app.post(
  "/chatHistory",
  decryptDataApi,
  validator.body(chatHistorySchema, {
    joi: { convert: true, allowUnknown: false },
  }),
  checkToken,
  chatHistory
);

export default app;

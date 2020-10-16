/*
 * @file: create_room.js
 * @description: It Contain create room router/api.
 * @author: Dixit
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import sendMessage from "../../../socket/handler";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * 
 * /api/v1/send_message:
 *  post:
 *   tags: ["SocketChat"]
 *   summary: User Create Room API
 *   description: Send Message for chat betweeen users type will be // 1=> text, 2=> media, userId will be Sender user id, In image,  Image Name that you upload in seperate API
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Send Message for chat betweeen users.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           roomId:
 *             type: string
 *             required: true
 *           appointmentId:
 *             type: string
 *             required: true
 *           message: 
 *             type: string
 *           image: 
 *             type: string
 *           type: 
 *             type: number
 *             required:
 *           userId:
 *             type: string
 *             required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const createRoomSchema = Joi.object({
  roomId: Joi.string().required().label("Created Room ID"),
  appointmentId: Joi.string().required().label("Appointment Id "),
  message: Joi.string().label("Message to send"),
  image: Joi.string().label("Image Name that you upload in seperate API"),
  userId: Joi.string().required().label("Sender user id"),
  type: Joi.number().valid(1, 2).required().label('Type')
});

/* app.post(
  "/send-message",
  validator.body(createRoomSchema, {
    joi: { convert: true, allowUnknown: false },
  }),
  checkToken,
  sendMessage
); */

export default app;

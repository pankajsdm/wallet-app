/*
 * @file: create_room.js
 * @description: It Contain create room router/api.
 * @author: Dixit
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import createRoom from "../../../socket/handler";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });
// https://swagger.io/docs/specification/2-0/describing-parameters

/**
 * 
 * /api/v1/create_room:
 *  post:
 *   tags: ["SocketChat"]
 *   summary: User Create Room API
 *   description: Create room for chat betweeen users
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        description: Create room for chat betweeen users.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           to:
 *             type: string
 *             required: true
 *           from: 
 *             type: string
 *             required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const createRoomSchema = Joi.object({
  to: Joi.string().required().label("Receiver user id"),
  from: Joi.string().required().label("Sender user id"),
});

/* app.post(
  "/create-room",
  validator.body(createRoomSchema, {
    joi: { convert: true, allowUnknown: false },
  }),
  checkToken,
  createRoom
); */

export default app;

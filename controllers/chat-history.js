/*
 * @file: chat-history.js
 * @description: It Contain function layer for listing history of chat controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from "../utilities/response";
import {
    chat_history
} from "../services/chat-history";
import Message from "../utilities/messages";

//**************** Get chat history using room id ***********/
export const chatHistory = async (req, res, next) => {
  try {
    const data = await chat_history(req.user.userId, req.body);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

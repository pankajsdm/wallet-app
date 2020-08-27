/*
 * @file: index.js
 * @description: It's combine all message routers.
 * @author: Dixit
 */

import createRoom from "./create-room";
import sendMessage from "./send-message";
import chatHistory from "./chatHistory";

// import disconnect from "./disconnect";
export default [
  createRoom,
  sendMessage,
  chatHistory
  // disconnect
];

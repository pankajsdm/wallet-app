/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Pankaj Pandey
 */

import user from "./v1/user";
import chatbot from "./v1/chatbot";
import SocketChat from "./v1/SocketChat";
import file from './v1/file';
import page from './v1/page';

/*********** Combine all Routes ********************/
export default [
  ...user,
  ...chatbot,
  ...file,
  ...page,
  ...SocketChat,
]

/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Pankaj Pandey
 */

import user from "./v1/user";
import service from "./v1/service";
import location from "./v1/location";
import transaction from "./v1/transaction";
import card from "./v1/card";
//import chatbot from "./v1/chatbot";
//import SocketChat from "./v1/SocketChat";
//import file from './v1/file';
//import page from './v1/page';

/*********** Combine all Routes ********************/
export default [
  ...user,
  ...service,
  ...location,
  ...transaction,
  ...card
]

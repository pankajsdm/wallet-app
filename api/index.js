/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Pankaj Pandey
 */

import user from "./v1/user";
import service from "./v1/service";
import redeemed from "./v1/redeemed";
import location from "./v1/location";
import transaction from "./v1/transaction";
import card from "./v1/card";
import report from "./v1/report";
import commission from "./v1/commission";
import country from "./v1/country";

export default [
  ...user,
  ...service,
  ...redeemed,
  ...location,
  ...transaction,
  ...card,
  ...report,
  ...commission,
  ...country,
]

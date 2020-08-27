/*
 * @file: index.js
 * @description: It's combine all page routers.
 * @author: Pankaj Pandey
 */

import add from './add';
import update from './update';
import detailBySlug from './get-detail';

export default [add, update, detailBySlug];

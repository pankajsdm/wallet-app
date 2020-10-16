/*
 * @file: index.js
 * @description: It's combine all report related routers.
 * @author: Pankaj Pandey
 */


import add from './add';
import list from './list';
import get from './get';
import remove from './delete';
export default [
    add,
    list,
    get,
    remove
];

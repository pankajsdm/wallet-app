/*
 * @file: index.js
 * @description: It's combine all location routers.
 * @author: Pankaj Pandey
 */


import add from './add';
import update from './update';
import get from './get';
import list from './list';
import remove from './remove';
import nearBy from './nearby';

export default [
    add,
    update,
    list,
    get,
    nearBy,
    remove
];

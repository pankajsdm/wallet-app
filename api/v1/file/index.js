/*
 * @file: index.js
 * @description: It's combine all file routers.
 * @author: Pankaj Pandey
 */

import upload from './upload';
import uploadRegister from './uploadRegister';
import get from './get';
import remove from './delete';

export default [upload, uploadRegister, get, remove];

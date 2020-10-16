/*
 * @file: index.js
 * @description: It's combine all card routers.
 * @author: Pankaj Pandey
 */


import add from './add';
import update from './update';
import lists from './lists';
import cardById from './single';
import deleteCard from './delete';
import applyCard from './apply-card';

export default [
    add,
    update,
    lists,
    cardById,
    applyCard,
    deleteCard
];

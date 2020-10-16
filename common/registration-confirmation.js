/*
 * @file: get-list.js
 * @description: It Contain get user list router/api.
 * @author: Pankaj Pandey
 */
import express from 'express';
import { getTokenData } from '../controllers/user';
const app = express();

app.get(
    '/confirmation/:token',
    getTokenData
);

export default app;
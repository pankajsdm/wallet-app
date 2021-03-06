/*
 * @file: app.js
 * @description: It Contain server setup function.
 * @author: Pankaj Pandey
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import fileUpload from 'express-fileupload';
import config from 'config';
import * as DB from './db';
import SwaggerJsDocs from './swagger-config';
import SocketService from "./socket/socketService";
var expressStaticGzip = require('express-static-gzip');
import api from './api';
import registerConfirmation from './common/registration-confirmation';

import http from 'http';

const { port } = config.get('app');
const app = express();


/* Define global path */
global.__basedir = __dirname;
global.__publicDir = path.join(__dirname, '/public/');
global.__viewsDir = path.join(__dirname, '/views/');
global.__uploadDir = path.join(__dirname, '/public/uploads/');
global.__imageDir = path.join(__dirname, '/public/uploads/images/');


/* Access-Control-Allow-Origin */
app.use(cors());

/* parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: false }));

/* parse application/json */
app.use(bodyParser.json({limit: '50mb'}));

/* parse application/multi-part */
app.use(fileUpload());

/* Swagger UI setup */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerJsDocs));

/* Define All Routes */
app.use('/api/v1', api);
app.use('/account', registerConfirmation);

/* 
* After your routes add a standard express error handler. This will be passed the Joi
* error, plus an extra "type" field so we can tell what type of validation failed
*/
app.use((err, req, res, next) => {
  
  /* console.log('req.body', req.body);
  console.log('req.files', req.files); */
  if (err && err.error && err.error.isJoi) {
    /* handing joi error, let's return a custom 400 json response */
    res
      .status(400)
      .json(err.error.message.toString().replace(/[\""]+/g, ''));
  } else {
    next(err);
  }
});


/* Run static setup */
app.use(express.static(__dirname + '/views'));
app.use(expressStaticGzip(__dirname + '/views/admin'));
//app.use(express.static(__dirname + '/views/account/confirmation'));
app.use(express.static(__dirname + '/public/uploads'));

app.get('/admin/*', function(req, res) {
  console.log("I am admin")
  return res.sendFile(path.join(__dirname + '/views/admin', 'index.html'));
});

/* app.get('/account/confirmation/:token', function(req, res) {
  console.log("I am token", req.params)
  //return res.sendFile(path.join(__dirname + '/views/account/confirmation', 'index.html'));
}); */


/* check mongose connection */
DB.connection();

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});


/* Configure socket implementation */
SocketService(server);
/*io.sockets.on('connection', function (socket) {
  socket.emit('messageChange', "testing");
});*/
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var eventsRouter = require('./routes/events');
var usersRouter = require('./routes/users');
var auth = require('./auth')

var encrypt = require('./routes/crypto/encrypt')
var decrypt = require('./routes/crypto/decrypt')

var app = express();

app.use(logger('dev'));
app.use(express.json());

// Authenticate the Token
app.use(auth);
// Decrypt the POST body
app.use(decrypt);

// Handle the data
app.use('/events', eventsRouter);
app.use('/users', usersRouter);

// Encrypt sent data
app.use(encrypt);

module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var eventsRouter = require('./routes/events');
var usersRouter = require('./routes/users');
var auth = require('./auth')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Will authenticate user before the other routers run
app.use(auth);
app.use('/events', eventsRouter);
app.use('/users', usersRouter);

module.exports = app;

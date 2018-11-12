var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:26dRUWfSBuVcsPnI@dryad-j3kir.mongodb.net/dryad?retryWrites=true');

var db = mongoose.connection;
db.on('open', () => {
    console.log("Mongo Connected");
});

var express = require('express');
var logger = require('morgan');

var eventsRouter = require('./routes/events');
var usersRouter = require('./routes/users');
var auth = require('./auth')

var app = express();

app.use(logger('dev'));
app.use(express.json())

// Authenticate the Token
app.use(auth);

// Handle the data
app.use('/events', eventsRouter);
app.use('/users', usersRouter);

module.exports = app;

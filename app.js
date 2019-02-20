var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:26dRUWfSBuVcsPnI@dryad-j3kir.mongodb.net/dryad?retryWrites=true');

var db = mongoose.connection;
db.on('open', () => {
    console.log("Mongo Connected");
});

var express = require('express');
var logger = require('morgan');

var eventsRouter = require('./routes/events');
var auth = require('./auth')

var app = express();

app.use(logger('dev'));
app.use(express.json())

// Authenticate the collector
app.use(auth);

// Handle event data
app.use('/event', eventsRouter);

module.exports = app;

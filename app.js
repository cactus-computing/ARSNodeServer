var mongoose = require('mongoose');
var config = require('./config.json')

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.host + '/' + config.mongo.db, 
    {
        user: config.mongo.user, 
        pass: config.mongo.pass, 
        useNewUrlParser: true
    });

var db = mongoose.connection;
db.on('open', () => {
    console.log("Mongo Connected");
});

var express = require('express');
var logger = require('morgan');

var eventsRouter = require('./routes/pickup');
var auth = require('./auth')

var app = express();

app.use(logger('dev'));
app.use(express.json())

// Authenticate the collector
app.use(auth);

// Handle pickup data
app.use('/pickup', eventsRouter);

module.exports = app;

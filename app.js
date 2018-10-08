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

var encrypt = require('./routes/crypto/encrypt')
var decrypt = require('./routes/crypto/decrypt')

var app = express();

app.use(logger('dev'));
app.use(require('body-parser').text())

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

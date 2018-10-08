var mongoose = require('mongoose');

var user = mongoose.Schema({
    // Unique ID assigned to this User
    id: String,
    // User name
    name: String,
    // Home Information
    home: {
        address: String,
        lat: Number,
        lon: Number
    },
})

module.exports = user;
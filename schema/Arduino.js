var mongoose = require('mongoose');

var arduino = mongoose.Schema({
    // Unique ID assigned to this Arduino
    id: String
})

module.exports = arduino;
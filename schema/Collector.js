var mongoose = require('mongoose');

var Collector = mongoose.Schema({
    _id: {type: String},
    vehicle: {
        type: {type: String},
        plate: String
    }
});

module.exports = mongoose.model("Collector", Collector);
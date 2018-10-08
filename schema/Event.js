var mongoose = require('mongoose');
var uuidv4 = require('uuid').v4;

var event = mongoose.Schema({
    // Unique ID assigned to this Event
    id: {
        type: String,
        default: uuidv4()
    },

    // Location of the execution of this event
    location: {
        lat: Number,
        lon: Number,
    },

    // Who got credited with this event
    user: String,
    // Which arduino executed this event
    arduino: String,

    // What material and weight was used for this event
    data: {
        material: String,
        weight: Number,
    },

    // When this was executed
    time: {
        type: Date,
        default: Date.now()
    },
});

module.expors = event;
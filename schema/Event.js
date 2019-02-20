const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var Event = mongoose.Schema({
    // Unique ID assigned to this Event
    id: {
        type: String,
        default: uuidv4()
    },
    // User credited for this event
    user: {
        id: String,
        name: String,
    },
    // Information of the collector
    collector: {
        id: String,
        location: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
    },
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

module.exports = mongoose.model('Event', Event);
var mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var Event = mongoose.Schema({
    // Unique ID assigned to this Event
    id: {
        type: String,
        default: uuidv4()
    },
    // Location of the execution of this event
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

var User = mongoose.Schema({
    // Unique ID assigned to this User
    id: String,
    // User name
    name: String,
    // What has this user recycled?
    events: {
        type: [Event],
        default: []
    },
    // Home Information
    home: {
        address: String,
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
        }
    }
})

User.index({ "home.location": "2dsphere" });

module.exports = { "user": mongoose.model('User', User), "event": mongoose.model('Event', Event)};
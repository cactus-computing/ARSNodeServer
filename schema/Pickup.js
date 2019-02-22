const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

var Pickup = mongoose.Schema({
    // Unique ID assigned to this Pickup
    id: {
        type: String,
        default: uuidv4()
    },
    // User credited for this pickup
    user: {
        id: String,
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
    // What material and weight was used for this pickup
    material: String,
    weight: Number,
    // When this was executed
    time: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Pickup', Pickup);
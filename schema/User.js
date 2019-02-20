var mongoose = require('mongoose');

var User = mongoose.Schema({
    // Unique ID assigned to this User
    id: String,
    // User name
    name: String,
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

module.exports = mongoose.model('User', User)
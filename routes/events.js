var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');

var events = []

/* POST a recycling event */

// Missing variable on url req?
router.post('/', function(req, res, next) {
    var event = {
        id: uuidv4(),

        lat: req.body['lat'],
        lon: req.body['lon'],

        user: -1,

        material: req.body['material'],
        weight: req.body['weight'],

        time: Date.now(),
        arduino: req.arduino.id
    }

    // TODO: Actually get the user from lat and lon

    // Found user at that lan and lon.
    if (event.user) {
        res.send(event);
    } else {
        res.sendStatus(404);
    }
});

/* GET a recycling event */
router.get('/:id', function(req, res, next) {
    var event = events.find(elem => {
        return elem.id == req.params.id;
    });

    if (event) {
        res.send(event);
    } else {
        res.sendStatus(404);
    }
});

/* GET all recycling events */
router.get('/', function(req, res, next) {
    res.send({ events });
})

/* GET all recycling events by a user id */
router.get('/user/:userId', function(req, res, next) {
    var userEvents = events.filter(elem => {
        return elem.user == req.params.userId;
    })
    res.send({ 'events': userEvents });
});

/* GET all recycling events by arduino id */
router.get('/arduino/:arduinoId', function(req, res, next) {
    var arduinoEvents = events.filter(elem => {
        return elem.arduino == req.params.arduinoId;
    })
    res.send({ 'events': arduinoEvents });
});

module.exports = router;

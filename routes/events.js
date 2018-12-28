var express = require('express');
var router = express.Router();

var User = require('../schema/User').user;
var Event = require('../schema/User').event;

/* POST a recycling event */
router.post('/', function(req, res, next) {
    User.aggregate(
        [
            { "$geoNear": {
                "near": {
                    "type": "Point",
                    "coordinates": [req.body['lon'], req.body['lat']]
                },
                "distanceField": "distance",
                "spherical": true,
                "maxDistance": 10 // In  Meters
            }}
        ],

        function(err, results) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                if (results.length == 0) {
                    res.sendStatus(404)
                } else {
                    var event = new Event({
                        location: {
                            coordinates: [req.body['lon'], req.body['lat']]
                        },
                        data: {
                            material: req.body.material,
                            weight: req.body.weight
                        }
                    });
                    User.findById(results[0]._id, (err, user) => {
                        user.events.push(event);
                        user.save();
                    })
                    res.send(results[0]);
                }
            }
        }
    )
});

module.exports = router;

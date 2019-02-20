var express = require('express');
var router = express.Router();

var User = require('../schema/User');
var Event = require('../schema/Event');

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
                "maxDistance": 10 // In Meters
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
                        user: {
                            id: results[0].id,
                            name: results[0].name,
                        },
                        collector: {
                            id: req.collector,
                            location: {
                                coordinates: [req.body['lon'], req.body['lat']]
                            }
                        },
                        data: {
                            material: req.body.material,
                            weight: req.body.weight
                        }
                    });
                    event.save().then(() => {
                        res.send(event);
                    });
                }
            }
        }
    )
});

module.exports = router;

var express = require('express');
var router = express.Router();

var User = require('../schema/User');
var Pickup = require('../schema/Pickup');

/* POST a recycling pickup */
router.post('/', function(req, res, next) {
    User.findOne()
        .where("home.location")
        .near({
                center: {
                    type: "Point",
                    coordinates: [req.body.location[0], req.body.location[1]]
                }, 
                spherical: true,
                maxDistance: 30 // Meters
            })
        .then((user) => {
            if (!user) {
                res.send({error: "User not found"});
                return;
            }
            var pickup = new Pickup({
                user: {
                    id: user.id,
                },
                collector: {
                    id: req.collector,
                    location: {
                        type: "Point",
                        coordinates: [req.body.location[0], req.body.location[1]]
                    }
                },
                material: req.body.material,
                weight: req.body.weight
            });
            pickup.save().then(() => {
                res.send(pickup);
            });
        }
    )
});

module.exports = router;

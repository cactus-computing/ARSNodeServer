var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const JWT_SECRET = require('./config.json').jwt;

const Collectors = require('./schema/Collector');

/* Authenticate Collector */
router.use(stripToken, function(req, res, next) {
    jwt.verify(req.token, JWT_SECRET, (err, data) => {
        if (err) {
            res.sendStatus(400);
            return;
        }

        // Check if the token type
        Collectors.findById(data.id, (err, collector) => {
            if (collector) {
                req.collector = collector;
                next();
            } else {
                res.sendStatus(400);
            }
        });
    });
});

/* Strip token from auth header */
function stripToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const bearer = authHeader.split(' ')[1];
        req.token = bearer;
        next();
    } else {
        res.sendStatus(400);
    }
}

module.exports = router;

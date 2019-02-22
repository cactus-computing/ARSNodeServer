var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const JWT_SECRET = require('./config.json').jwt;

// TODO: Connect to Database
const collectors = [
    {
        id: '9dki80',
    }
]

/* Authenticate Collector */
router.use(getToken, function(req, res, next) {
    jwt.verify(req.token, JWT_SECRET, (err, data) => {
        if (err) {
            res.sendStatus(400);
            return;
        }

        // Check if the token type
        var collector = collectors.find(elem => {
            return data.id == elem.id;
        });
        if (collector) {
            req.collector = collector.id;
            next();
        } else {
            res.sendStatus(400);
        }
    });
});

/* Strip token from auth header */
function getToken(req, res, next) {
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

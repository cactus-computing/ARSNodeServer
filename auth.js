var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const arduinos = [
    {
        id: '9dki80',
    }
]

/* Do Auth. */
router.use(getToken, function(req, res, next) {
    jwt.verify(req.token, 'dirtysocks', (err, data) => {
        if (err) {
            res.sendStatus(400);
            return;
        }

        // Check if the token type
        var arduino = arduinos.find(elem => {
            return data.id == elem.id;
        });
        if (arduino) {
            req.device = arduino;
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

var express = require('express');
var base64 = require('base64url');
var crypto = require('crypto'), algorithm = 'aes-256-gcm', password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
var router = express.Router();

/* Decrypt incoming body */
router.use(function(req, res, next) {
    if (req.method == 'POST') {
        // If data is a String then it's a encrypted JSON Object
        if (typeof req.body.data == "string") {
            var decrypted = decrypt(req.body.data);
            if (!decrypted) {
                res.sendStatus(400);
                return;
            }

            req.body = JSON.parse(decrypted);
        } else {
            req.body = req.body.data;
        }
    }
    next();
});

/* Decrypt AES GCM */
function decrypt(encrypted) {
    try {
        var data = encrypted.split('.');

        var content = base64.decode(data[0]);
        var auth = base64.toBuffer(data[1]);
        var iv = base64.toBuffer(data[2]);

        var decipher = crypto.createDecipheriv(algorithm, password, iv)
        decipher.setAuthTag(auth);
        var dec = decipher.update(content, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    } catch(error) {
        return null;
    }
}

/* Bounce sent data encrypted */
router.post('/bounce', function(req, res, next) {
    res.body = req.body;
    next();
});

module.exports = router;
var express = require('express');
var base64 = require('base64url');
var crypto = require('crypto'), algorithm = 'aes-256-gcm', password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
var router = express.Router();

/*

    AES GCM Format
    base64Url(encrypt.content).base64Url(encrypt.auth).base64Url(iv)

*/


/* UNSAFE: Bounce decrypted data */
router.post('/decrypt', function(req, res, next) {
    res.send(req.body);
});

/* Encrypt outgoing body */
router.use(function(req, res, next) {
    var encrypted = encrypt(JSON.stringify(res.body));
    if (!encrypted) {
        res.sendStatus(400);
        return;
    }

    var content = base64(encrypted.content);
    var auth = base64(encrypted.auth);
    var encryptIv = base64(encrypted.iv);

    res.send(content + '.' + auth + '.' + encryptIv);
});

/* Encrypt AES GCM */
function encrypt(text) {
    try {
        var iv = crypto.randomBytes(12);
        var cipher = crypto.createCipheriv(algorithm, password, iv)
        var encrypted = cipher.update(text, 'utf8', 'hex')
        encrypted += cipher.final('hex');
        var auth = cipher.getAuthTag();
        return {
            content: encrypted,
            auth,
            iv
        };
    } catch(error) {
        return null;
    }
}

module.exports = router;
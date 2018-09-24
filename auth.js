var express = require('express');
var router = express.Router();

/* Do Auth. */
router.use(function(req, res, next) {
    // TODO: Actualy do some authentication
    console.log("Auth")
    next()
});

module.exports = router;

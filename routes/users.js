var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User', require('../schema/User'))

/* GET a user. */
router.get('/:id', function(req, res, next) {
  User.findOne({id: req.params.id}).exec((err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      if (!user) {
        res.sendStatus(404)
        return;
      }
      res.body = user;
      next();
    }
  });
});

/* GET all users. */
router.get('/', function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.body = users;
      next();
    }
  })
});

module.exports = router;

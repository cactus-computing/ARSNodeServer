var express = require('express');
var router = express.Router();

var users = 
  [
    {
      id: 1337,
      name: 'Jose Miguel'
    },
    {
      id: 212,
      name: 'Juan Pastel'
    }
  ]

/* GET a user. */
router.get('/:id', function(req, res, next) {
  var user = users.find(elem => {
    return elem.id == req.params.id;
  })

  if (user) {
    res.body = user;
    next()
  } else {
    res.sendStatus(404);
  }
});

/* GET all users. */
router.get('/', function(req, res, next) {
  res.body = {users};
  next();
});

module.exports = router;

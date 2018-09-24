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
    res.send(user);
  } else {
    res.statusCode = 404
    res.send( { error: "User doesn't exist" } )
  }
});

/* GET all users. */
router.get('/', function(req, res, next) {
  res.send( { users } )
});

module.exports = router;

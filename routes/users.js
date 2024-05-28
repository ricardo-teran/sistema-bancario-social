var express = require('express');
var router = express.Router();
var usersController = require("../controllers/users.c");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send(usersController.show());
});

usersController

/* POST crear user */
router.post('/', usersController.create);

module.exports = router;
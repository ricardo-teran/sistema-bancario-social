var express = require('express');
var router = express.Router();
var usersController = require("../controllers/users.c");

/* POST crear user */
router.post('/', usersController.create);

/* GET users listing. */
router.get('/', usersController.show);

/* POST user por id */
router.get('/:id', usersController.showByID);

/* PUT editar user */
router.put('/:id', usersController.edit);

module.exports = router;
var usersModel = require("../models/users.m");

class UsersController {
  create(req, res) {
    let user = req.body;

    console.log("user")

    if (!user.name) {
      return res.status(405).send("Faltan datos del usuario por agregar.");
    }

    usersModel.create(user);
    return res.status(201).send(user);
  }

  show() {
    return usersModel.show();
  }
}

module.exports = new UsersController();
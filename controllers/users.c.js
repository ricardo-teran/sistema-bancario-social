var usersModel = require("../models/users.m");

class UsersController {
  create(req, res) {
    let user = req.body;

    if (!user.name) {
      return res.status(405).send("Faltan datos del usuario por agregar.");
    }

    usersModel.create(user);
    return res.status(201).send(user);
  }

  show(req, res) {
    res.status(200).send(usersModel.show());
  }

  showByID(req, res) {
    const id = req.params.id;

    const result = usersModel.showByID(id);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${id}`);
    }

    res.status(200).send(result);
  }

  edit(req, res) {
    const id = req.params.id;
    const updatedUser = req.body;

    const result = usersModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${id}`);
    }

    res.send(usersModel.edit(updatedUser, id));
  }
}

module.exports = new UsersController();
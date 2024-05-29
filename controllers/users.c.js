var usersModel = require("../models/users.m");
var loansModel = require("../models/loans.m");
var savingsModel = require("../models/savings.m");
var cooperativeModel = require("../models/cooperatives.m");

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

    res.status(200).send(usersModel.edit(updatedUser, id));
  }

  delete(req, res) {
    const id = req.params.id;

    const result = usersModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${id}`);
    }
    
    res.status(200).send(usersModel.delete(id));
  }

  getAccounts(req, res){
    const id = req.params.id;
    const result = usersModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró el usuario con id: ${id}`);
    }

    const loans = loansModel.showByUserID(id);
    const savings =  savingsModel.showByUserID(id);
    const cooperatives =  cooperativeModel.showByUserID(id);

    const accounts = {
      loans: loans,
      savings: savings,
      cooperatives: cooperatives
    }

    res.status(200).send(accounts); 
  }
}

module.exports = new UsersController();
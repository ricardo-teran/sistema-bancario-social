var cooperativesModel = require("../models/cooperatives.m");
var usersModel = require("../models/users.m");


let a = {
  "id": 1,
  "name": "Cooperativa ABC",
  "members": [1],
  "interestRate": 4,
  "balance": 500,
  "createdAt": "2024-03-10"
}

class CooperativesController {
  create(req, res) {
    let cooperative = req.body;

    if (!cooperative.name || !cooperative.interestRate || !cooperative.balance) {
      return res.status(405).send("Faltan datos de la cooperativa por agregar.");
    }

    const result = usersModel.areUsersValid(cooperative.members);

    if (!result) {
      return res.status(404).send(`No se encontró(aron) algún(os) usuario(s) con los siguientes id: ${cooperative.members}`);
    }

    cooperative = { ...cooperative, createdAt: new Date() }

    cooperativesModel.create(cooperative);
    return res.status(201).send(cooperative);
  }

  show(req, res) {
    res.status(200).send(cooperativesModel.show());
  }

  showByID(req, res) {
    const id = req.params.id;

    const result = cooperativesModel.showByID(id);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró la cooperativa con id: ${id}`);
    }

    res.status(200).send(result);
  }

  edit(req, res) {
    const id = req.params.id;
    const updatedCooperative = req.body;

    const cooperativeResult = cooperativesModel.showByID(id);
    if (cooperativeResult.length === 0) {
      return res.status(404).send(`No se encontró la cooperativa con id: ${id}`);
    }

    if (updatedCooperative.members) {
      const result = usersModel.areUsersValid(updatedCooperative.members);
      if (!result) {
        return res.status(404).send(`No se encontró(aron) algún(os) usuario(s) con los siguientes id: ${updatedCooperative.members}`);
      }
    }

    const cooperative = {
      id: id,
      name: updatedCooperative.name ? updatedCooperative.name : cooperativeResult[0].name,
      members: updatedCooperative.members ? updatedCooperative.members : cooperativeResult[0].members,
      balance: updatedCooperative.balance ? updatedCooperative.balance : cooperativeResult[0].balance,
      interestRate: updatedCooperative.interestRate ? updatedCooperative.interestRate : cooperativeResult[0].interestRate,
      createdAt: cooperativeResult[0].createdAt,
    };

    res.status(200).send(cooperativesModel.edit(cooperative, id));
  }

  delete(req, res) {
    const id = req.params.id;

    const result = cooperativesModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró la cooperativa con id: ${id}`);
    }

    res.status(200).send(cooperativesModel.delete(id));
  }
}

module.exports = new CooperativesController();
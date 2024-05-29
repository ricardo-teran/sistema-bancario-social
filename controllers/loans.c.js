var loansModel = require("../models/loans.m");

class LoansController {
  create(req, res) {
    let loan = req.body;
    console.log("loan");

    if (!loan.userId || !loan.amount || !loan.interestRate || !loan.nextPaymentDate || !loan.balance) {
      return res.status(405).send("Faltan datos del préstamo por agregar.");
    }

    loan = { ...loan, nextPaymentDate: new Date(req.body.nextPaymentDate), createdAt: new Date() }

    loansModel.create(loan);
    return res.status(201).send(loan);
  }

  show(req, res) {
    res.status(200).send(loansModel.show());
  }

  showByID(req, res) {
    const id = req.params.id;

    const result = loansModel.showByID(id);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró el préstamo con id: ${id}`);
    }

    res.status(200).send(result);
  }


  edit(req, res) {
    const id = req.params.id;
    const updatedLoan = req.body;

    const result = loansModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró el préstamo con id: ${id}`);
    }

    res.status(200).send(loansModel.edit(updatedLoan, id));
  }

  delete(req, res) {
    const id = req.params.id;

    const result = loansModel.showByID(id);
    if (result.length === 0) {
      return res.status(404).send(`No se encontró el préstamo con id: ${id}`);
    }

    res.status(200).send(loansModel.delete(id));
  }
}

module.exports = new LoansController();
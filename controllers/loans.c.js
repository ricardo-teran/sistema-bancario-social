var loansModel = require("../models/loans.m");

class LoansController {
  create(req, res) {
    let loan = req.body;

    if (!loan.userId || !loan.amount || !loan.interestRate || !loan.nextPaymentDate || !loan.balance) {
      return res.status(405).send("Faltan datos del préstamo por agregar.");
    }

    const result = loansModel.showByID(loan.userId);

    if (result.length === 0) {
      return res.status(404).send(`No se encontró el préstamo con id: ${loan.userId}`);
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

    const loan = {
      id: id,
      userId: updatedLoan.userId ? updatedLoan.userId : result[0].userId,
      amount: updatedLoan.amount ? updatedLoan.amount : result[0].amount,
      interestRate: updatedLoan.interestRate ? updatedLoan.interestRate : result[0].interestRate,
      nextPaymentDate: updatedLoan.nextPaymentDate ? updatedLoan.nextPaymentDate : result[0].nextPaymentDate,
      balance: updatedLoan.balance ? updatedLoan.balance : result[0].balance,
    };

    res.status(200).send(loansModel.edit(loan, id));
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
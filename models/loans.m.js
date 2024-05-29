const { v4: uuidv4 } = require('uuid');

let loansDB = [
  {
    "id": 1,
    "userId": 1,
    "amount": 2000,
    "interestRate": 5,
    "nextPaymentDate": "2024-07-29",
    "balance": -2500,
 }
]

class LoansModel {
  create(loan) {
    loan.id = uuidv4();
    loansDB.push(loan);
  }

  show() {
    return loansDB;
  }

  showByID(id) {
    return loansDB.filter(loan => loan.id == id);
  }

  edit(updatedUser, id) {
    const index = loansDB.findIndex(loan => loan.id == id);
    return loansDB[index] = { id, ...updatedUser };
  }

  delete(id) {
    const index = loansDB.findIndex(loan => loan.id == id);
    loansDB.splice(index, 1);
    return loansDB;
  }
}

module.exports = new LoansModel();
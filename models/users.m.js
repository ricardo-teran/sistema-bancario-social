const { v4: uuidv4 } = require('uuid');

let usersDB = [
  {
    id: 1,
    name: "Ricardo"
  }
]

class UsersModel {
  create (user) {
    user.id = uuidv4();
    usersDB.push(user);
  }

  show (req, res) {
    return usersDB;
  }
}

module.exports = new UsersModel();
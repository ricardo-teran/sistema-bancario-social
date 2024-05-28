const { v4: uuidv4 } = require('uuid');

let usersDB = [
  {
    id: 1,
    name: "Ricardo"
  }
]

class UsersModel {
  create(user) {
    user.id = uuidv4();
    usersDB.push(user);
  }

  show(req, res) {
    return usersDB;
  }

  showByID(id) {
    return usersDB.filter(user => user.id == id);
  }

  edit(updatedUser, id) {
    const index = usersDB.findIndex(user => user.id == id);
    return usersDB[index] = { id, ...updatedUser };
  }

  delete(id) {
    const index = usersDB.findIndex(user => user.id == id);
    usersDB.splice(index, 1);
    return usersDB;
  }
}

module.exports = new UsersModel();
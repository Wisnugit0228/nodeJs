const express = require('express');
const usersController = require('../controller/users.js');

const routerUser = express.Router();

routerUser.get('/', usersController.getAllUsersController);

routerUser.post('/', usersController.createUsersController);

routerUser.put('/:id', usersController.updateUser);

routerUser.delete('/:id', usersController.deleteUser);


module.exports = routerUser;
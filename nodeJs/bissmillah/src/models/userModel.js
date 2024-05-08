const db = require ('../config/connection.js');





const getAllUsers = () => {
    return ("SELECT id, name, email, image FROM users");
};

const getUserById = (id) => {
    return `SELECT * FROM users WHERE id = ${id}`;
};

const createUser = (name, email, password, image) => {
    return `INSERT INTO users (name, email, password, image) VALUES ('${name}', '${email}', '${password}', '${image}')`;
};

const getNameUser = (name) => {
    return `SELECT name FROM users WHERE name = '${name}'`;
}

const getIdUser = (id) => {
    return `SELECT id FROM users WHERE id=${id}`;
}

const updateUser = (id, name, email, password) => {
    return `UPDATE users SET name='${name}', email='${email}', password='${password}' WHERE id=${id}`
}

const cehkUpdateUser = (id, name) => {
    return `SELECT name FROM users WHERE id!=${id} AND name='${name}'`;
}

const deleteUser = (id) => {
    return `DELETE FROM users WHERE id=${id}`;
}
    

module.exports = {getAllUsers, getUserById, createUser, getNameUser, updateUser, getIdUser, cehkUpdateUser, deleteUser};

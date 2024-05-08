const dbPool = require ('../config/db');

const getAllUsers = () => {
    const query = 'SELECT * FROM users';
    return dbPool.execute(query);
}


const createNewUser = (body) => {
    const query = `INSERT INTO users (name, email, password) VALUES ('${body.name}', '${body.email}', '${body.password}')`;

    return dbPool.execute(query);
}


const updateUser = (body, id) => {
    const query = `UPDATE users SET name = '${body.name}', email = '${body.email}', password = '${body.password}' WHERE id=${id}`;

    return dbPool.execute(query);
}

const deleteUser = (id) => {
    const query = `DELETE FROM users WHERE id=${id}`;

    return dbPool.execute(query);
}

const cekUser = (id) => {
    const query = `SELECT id FROM users WHERE id=${id}`;

    return dbPool.execute(query);
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    cekUser,
}
const userModel  = require('../models/userModel.js')
const db = require ('../config/connection.js');
const response = require('../response.js')

const getUsers = (req, res) => {
    
    db.query(userModel.getAllUsers(), (error, result) => {
       
        response(200, result, "GET data success", res)
    });
};


const getUserById = (req, res) => {
    const {id} = req.params;
    db.query(userModel.getUserById(id), (error, result) => {
        if(error) throw error;

        if(result[0] === undefined) {
            response(404, result, "Data not found", res);
            return;
        }
       

        response(200, result, "GET BY Id Success", res);
    });
    
}


const createUser = (req, res) => {
   
    const {name, email, password} = req.body;
    const image = req.file.path;
    console.log(image);
    if(password === undefined || email === undefined || name === undefined){
        response(500, 'invalid', 'field required', res);
        return;
    };
    db.query(userModel.createUser(name, email, password, image), (error, result) => {
        if (error) throw error;
        if(result?.affectedRows == 1){
                const data = {
                    isSuccess: result.affectedRows,
                    id: result.insertId,
                };
                response(201, data, 'Data added success', res);
        };
    });
};


const updateUser = (req, res) => {
    const {id} = req.params;
    const {name, email, password} = req.body;

    if(password === undefined || email === undefined || name === undefined){
        response(500, 'invalid', 'field required', res);
        return;
    }
    db.query(userModel.updateUser(id, name, email, password), (error, result) => {
        if (error) response(500, 'invalid', 'error', res)
        if(result?.affectedRows == 1){
                const data = {
                    isSuccess: result.affectedRows,
                    message: result.message,
                };
                response(200, data, 'Data updated success', res);
            };
    })
};


const deleteUser = (req, res) => {
    const {id} = req.params;
    db.query(userModel.deleteUser(id), (error, result) => {
        if(error) throw error;
        if(result?.affectedRows === 1){
            const data = {
                isSuccess: result.affectedRows,
            };
            response(200, data, 'DATA deleted success', res);
        }
    })
}


module.exports={
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
const db = require('../config/connection.js');
const userModel = require('../models/userModel.js');

const cehkName = (req, res, next) => {
    const {name} = req.body;
    db.query(userModel.getNameUser(name), (error, result) => {
        if(error) throw error;
        if(result[0] !== undefined) {
            res.status(500).json({
                message: 'Username already taken',
            });
            return;
        }
        next();
    })
};

const cehkId = (req, res, next) => {
    const {id} = req.params;
    db.query(userModel.getIdUser(id), (error, result) => {
        if(error) throw error;
        if(result[0] === undefined) {
            res.status(404).json({
                message: 'Id not found',
            });
            return;
        }
        next();
    })
};

const cehkUpdate = (req, res, next) => {
    const {id} = req.params;
    const {name} = req.body;
    
    db.query(userModel.cehkUpdateUser(id, name), (error, result) => {
        if(error) throw error;
        if(result[0] !== undefined) {
            res.status(500).json({
                message: 'Username already taken',
            });
            return;
        }
        next();
    });
}

module.exports = {
    cehkName,
    cehkId,
    cehkUpdate
}
const userModel = require('../models/users')

const getAllUsersController = async (req,res) => {

    try {
        const [data] = await userModel.getAllUsers();
        res.json(
            {
                statusCode: 200,
                messsage: 'GET user success',
                data: data
            }
        );
        
    } catch (error) {
        res.status(500).json({
            messsage: 'server error',
            serverMessage: error,
        });
        
    }

};


const createUsersController = async (req, res) => {
    const {body} = req;
    try {
        await userModel.createNewUser(body);
        res.json(
            {
                messsage: 'CREATE user success',
                data: body
            }
        );
    } catch (error) {
        res.status(500).json({
            messsage: 'server error',
            serverMessage: error,
        });
    }
    console.log(req.body);
};


const updateUser = async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const cek = userModel.cekUser(id);
    console.log(cek);
    try {
        await userModel.updateUser(body, id);
        res.json({
            messsage: 'UPDATE success',
            data: {
                id: id,
                ...body,
            }
        })
    } catch (error) {
        res.status(500).json({
            messsage: 'server error',
            serverMessage: error,
        });
    }
    
}


const deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        await userModel.deleteUser(id);
        res.json({
            messsage: 'DELETE Success',
            data: {
                id:id,
            }
        })
    } catch (error) {
        res.status(500).json({
            messsage: 'server error',
            serverMessage: error,
        });
    }
}

module.exports = {
    getAllUsersController,
    createUsersController,
    updateUser,
    deleteUser
}
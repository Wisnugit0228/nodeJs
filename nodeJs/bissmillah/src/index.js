const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const { getUsers, createUser, getUserById, updateUser, deleteUser } = require('./controller/userController');
const userMiddleware = require('./middleware/userMiddleware.js')
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if( file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter});

app.use(bodyParser.json());


app.get('/users', getUsers);
app.post('/users', upload.single('image'), userMiddleware.cehkName,createUser);
app.get('/users/:id', getUserById);
app.put('/users/:id', userMiddleware.cehkId, userMiddleware.cehkUpdate, updateUser);
app.delete('/users/:id', userMiddleware.cehkId, deleteUser);


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
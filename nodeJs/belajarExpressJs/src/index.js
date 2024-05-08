require('dotenv').config();
const express = require('express');
const routerUsers = require('./routes/users');
const PORT = process.env.PORT || 4000;


const app = express();


app.use(express.json());

app.use('/users', routerUsers);

app.listen(PORT, () => {
    console.log(`server berjalan di port ${PORT}`);
})
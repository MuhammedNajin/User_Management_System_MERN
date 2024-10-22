const express = require('express');
const { auth } = require('../middleware/auth')

require('dotenv').config();


const adminRoute = express.Router();

const { home, editUser, createUser, deleteUser, searchUser, login, } = require('../controllers/adminController');


adminRoute.use((req, res, next) => {
    console.log(req.path, req.method, req.url);
    next()
})

adminRoute.post('/login', login);
adminRoute.get('/home', auth, home);
adminRoute.get('/search-user',auth, searchUser);
adminRoute.post('/create-user', auth, createUser);
adminRoute.put('/edit-user', auth, editUser);
adminRoute.delete('/delete-user', auth, deleteUser);



module.exports = adminRoute
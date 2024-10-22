// Importing the Express framework module
const express = require('express');


// Importing controller functions for handling user-related operations
const {
    login,
    signup,
    profile,
    getProfile,
    home
} = require('../controllers/userController');

const { auth } = require('../middleware/auth')
// Creating an instance of Express Router
const userRoute = express.Router();

// Defining routes and associating them with controller functions
// Route for user signup - POST method

userRoute.use((req, res, next) => {
    console.log('user',req.path, req.method, req.url);
    next()
})

userRoute.get('/user', auth, home);

userRoute.post('/signup', signup);

// Route for user login - POST method
userRoute.post('/login', login);

// Route for updating user profile - PUT method
userRoute.post('/profile', auth, profile);

userRoute.get('/profile/:id', auth, getProfile)



// Exporting the userRoute instance to make it accessible to other parts of the application
module.exports = userRoute;

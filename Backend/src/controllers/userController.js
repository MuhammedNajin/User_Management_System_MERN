const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret_key = process.env.SECRET_KEY;

const login = asyncHandler( async(request, responce) => {
    try {
      console.log('login request', request.body);
      const { email, password } = request.body;
      const user = await User.findOne({ email })
      if(!user) {
        return responce.status(401).json({ massage: 'invalid email' });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if(!comparePassword) {
         return responce.status(402).json({ massage: 'invalid password' });
      }
        const token = jwt.sign({userId: user._id}, secret_key, {expiresIn: '1h'});
        console.log('access token', token);
      if(user && password) {
         responce.status(200).json({ user, token });
      }
    } catch (error) {
      
    }
})

const home = asyncHandler((request, response) => {
   try {
      console.log('home hello')
      response.sendStatus(200)
   } catch (error) {
      console.log(error)
   }
})

const signup =  asyncHandler(async (request, response) => {
    console.log('hi recived', request.body);
    const { name, email, phone, password} = request.body;
    const same = await User.findOne({email: email});
   //  if(same.email === email) {
   //    return response.status(401).json({massage : 'Email already exists!'});
   //  }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
    });
   if(user) {
     response.status(201).json({user});
   }
})

const profile = asyncHandler(async (request, response) => {
       const { url, id } = request.body;
       if( !url || !id) {
          return response.sendStatus(500);
       }
    const update =  await User.updateOne({ _id: id }, {
         $set: {
           image: url,
         }
       })

       if(update) {
         response.sendStatus(201);
       }
})

const getProfile = asyncHandler(async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById({_id: id});
        if(!user?._id) {
           return response.sendStatus(404);
        }
        response.status(200).json({ user });
    } catch (error) {
       console.log(error);
    }
})


module.exports = {
    login,
    signup,
    profile,
    getProfile,
    home
}


const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;
const home = asyncHandler(async (request, response) => {
  try {
    const user = await User.find();
    response.json({ user });
  } catch (error) {
    console.log(error);
  }
});

const login = asyncHandler(async (request, response) => {
  try {
    const { email, password } = request.body;
   
    const credentialEmail = process.env.EMAIL;
    const credentialPassword = process.env.PASSWORD;

    if (credentialEmail !== email) {
      response.status(401).json({ massage: "Invalid email" });
    }

    if (credentialPassword !== password) {
      response.status(402).json({ massage: "Invalid password" });
    }

    if (credentialEmail === email && credentialPassword === password) {
      const token = jwt.sign({ admin: email }, secret_key, { expiresIn: '1h'} );
      response.status(200).json({ token });
    }
  } catch (error) {
    
  }
});

const createUser = asyncHandler(async (request, response) => {
  try {
    const { name, email, phone, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    if (user) {
      response.status(201).json({ user });
    }
  } catch (error) {
    console.log(error);
  }
});

const editUser = asyncHandler(async (request, response) => {
  try {
    const { name, email, phone, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          name,
          email,
          phone,
          password: hashedPassword,
        },
      },
      {
        new: true,
      }
    );

    if (user) {
      response.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
  }
});

const deleteUser = asyncHandler(async (request, response) => {
  try {
    const { email } = request.query;
    console.log(email);
    if (!email) {
      response.sendStatus(500);
    }

    const user = await User.findOneAndDelete({ email: email });
    if (user) {
      response.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
  }
});

const searchUser = asyncHandler(async (request, response) => {
  try {
    const { search } = request.query;
    console.log("search", search);
    const users = await User.find({
      name: { $regex: search, $options: "i" },
    });
    response.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  createUser,
  deleteUser,
  editUser,
  home,
  searchUser,
  login,
};

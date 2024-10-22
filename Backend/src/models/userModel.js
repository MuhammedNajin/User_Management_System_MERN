const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: { type: String,  required: true},
    email: { type: String, unique: true, required: true},
    phone: { type: String, maxLength: 10, required: true},
    password: { type: String, required: true},
    image: { type: String, }
});


module.exports = mongoose.model('Users', userModel);
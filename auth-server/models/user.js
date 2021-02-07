const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    level: { type: String, required: true }, //admin, produtos, consumidor
    dataRegisto: { type: String, required: true },
    filiacao : { type: String, required: true }


  });

module.exports = mongoose.model('user', userSchema)
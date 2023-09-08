const mongoose = require('mongoose');

const userCollection = 'user';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    status: String,
})

const Users = mongoose.model(userCollection, userSchema);

module.exports = Users;
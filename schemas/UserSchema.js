var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
});

module.exports = UserSchema;
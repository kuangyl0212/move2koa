var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
});

module.exports = UserSchema;
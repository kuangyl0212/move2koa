var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    content: String,
    by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createTime: Date,
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
});

module.exports = CommentSchema;
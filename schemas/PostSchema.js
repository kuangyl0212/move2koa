var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createTime: Date,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
});

module.exports = PostSchema;
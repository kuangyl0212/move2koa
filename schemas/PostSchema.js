var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createTime: Date,
});

module.exports = PostSchema;
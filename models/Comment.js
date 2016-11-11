var mongoose = require('mongoose');
var CommentSchema = require('../schemas/CommentSchema');

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
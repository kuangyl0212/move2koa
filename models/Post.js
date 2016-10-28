var mongoose = require('mongoose');
var PostSchema = require('../schemas/PostSchema');

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String
});

module.exports = mongoose.model('Post', PostSchema);

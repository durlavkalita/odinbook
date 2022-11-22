const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: {
    type: String,
    required: [true, 'Comment must not be empty']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
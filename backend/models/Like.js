const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LikeSchema = new Schema({
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

module.exports = mongoose.model('Like', LikeSchema);
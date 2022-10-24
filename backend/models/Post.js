const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Post must not be empty']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Post', PostSchema);
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Post must not be empty']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  likes: [{type: Schema.Types.ObjectId, ref:'User'}]
});

module.exports = mongoose.model('Post', PostSchema);
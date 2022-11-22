const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'firstName is required.']
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Enter a valid password.']
  },
  profilePic: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('User', UserSchema);
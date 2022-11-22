const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FriendSchema = new Schema(
    {
        senderId: { type: Schema.Types.ObjectId, ref:'User', required: true },
        receiverId: { type: Schema.Types.ObjectId, ref:'User', required: true },
        response: { type: Boolean, default: false }
    }
);

module.exports = mongoose.model('Friend', FriendSchema);
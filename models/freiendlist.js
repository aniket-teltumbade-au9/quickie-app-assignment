var mongoose = require('mongoose')

var Schema = mongoose.Schema
var FriendSchema = new Schema({
    inviter: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    invitee: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    status: { type: Boolean, default: false }
})

var FriendModel = mongoose.model('friend', FriendSchema)

module.exports = FriendModel
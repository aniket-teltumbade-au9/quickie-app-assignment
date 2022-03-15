var mongoose = require("mongoose")

var UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

var UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
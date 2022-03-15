var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PostSchema = new Schema({
    userid: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    header: { type: String, required: true },
    photo: { type: String },
    video: { type: String },
    visibility: { type: ['Friends', 'Public'], required: true }
})

var PostModel = mongoose.model('post', PostSchema)

module.exports = PostModel
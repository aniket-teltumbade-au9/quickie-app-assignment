const stringToObjectId = require("../helper/stringToObjectId");
const PostModel = require("../models/my_profile")
const UserModel = require("../models/signup_login")

exports.submitPost = (req, res) => {
    let { file, user } = req
    console.log(req);
    let {
        header,
        visibility,
    } = req.body
    console.log(file);
    UserModel.find({ email: user }, (uerror, uresult) => [
        PostModel.create({
            header,
            visibility,
            photo: `${req.protocol}://${req.headers.host}/${file.destination}${file.filename}`,
            userid: uresult[0]._id
        }, (error, result) => {
            res.send(result)
        })
    ])
}
exports.deletePost = (req, res) => {
    UserModel.find({ email: req.user }, (uerror, uresult) => {
        PostModel.deleteOne({
            _id: stringToObjectId(req.body._id),
            userid: uresult[0]._id
        }, (error, result) => {
            res.send(result)
        })
    })
}

exports.visibilityChange = (req, res) => {
    if (req.body.visibility === 'Public' || req.body.visibility === 'Friends') {
        UserModel.find({ email: req.user }, (uerror, uresult) => {
            PostModel.updateOne({ visibility: req.body.visibility }, {
                _id: stringToObjectId(req.body._id),
                userid: uresult[0]._id
            }, (error, result) => {
                res.send(result)
            })
        })
    }
    else {
        res.send({ error: 'You can set visibility either Public Or Friends' })
    }
}
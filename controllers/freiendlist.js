const FriendModel = require("../models/freiendlist")
const UserModel = require("../models/signup_login")

exports.usersList = (req, res) => {
    UserModel.find({ email: req.user }, (uerror, uresult) => {
        FriendModel.find({ $or: [{ inviter: uresult[0]._id }, { invitee: uresult[0]._id }] }, (ferror, fresult) => {
            res.send(fresult)
        })
    })
}
exports.sendRequest = (req, res) => {
    UserModel.find({ email: req.user }, (uerror, uresult) => {
        UserModel.find({ email: req.body.email }, (error, result) => {
            FriendModel.create({
                inviter: uresult[0]._id,
                invitee: result[0]._id,
                status: false
            }, (ferror, fresult) => {
                res.send(fresult)
            })
        })
    })
}
exports.acceptRequest = (req, res) => {
    UserModel.find({ email: req.user }, (uerror, uresult) => {
        UserModel.find({ email: req.body.email }, (error, result) => {
            FriendModel.find({ inviter: result[0]._id, invitee: uresult[0]._id }, (ferror, fresult) => {
                if (fresult.length > 0) {
                    FriendModel.updateOne({
                        status: true
                    }, {
                        inviter: fresult[0]._id,
                        invitee: fresult[0]._id,
                    }, (ferror, cfresult) => {
                        res.send(cfresult)
                    })
                }
                else {
                    res.send({ error: "You didn't recieved any request from this member" })
                }
            })

        })
    })
}
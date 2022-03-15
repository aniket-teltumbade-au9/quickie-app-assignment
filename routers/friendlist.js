var express = require("express")
const { usersList, sendRequest, acceptRequest } = require("../controllers/freiendlist")
const { authVerify } = require("../helper/authVerify")

var FriendListRouter = express.Router()

FriendListRouter.get('/', authVerify, usersList)
FriendListRouter.post('/send_request', authVerify, sendRequest)
FriendListRouter.post('/accept_request', authVerify, acceptRequest)

module.exports = FriendListRouter
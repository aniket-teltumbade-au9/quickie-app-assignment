var express = require("express")
const { submitPost, deletePost, visibilityChange } = require("../controllers/my_profile")
const { authVerify } = require("../helper/authVerify")
const upload = require("../helper/fileUpload")

var PostRouter = express.Router()

PostRouter.post('/', [authVerify, upload.single('photo')], submitPost)
PostRouter.delete('/', authVerify, deletePost)
PostRouter.patch('/', authVerify, visibilityChange)

module.exports = PostRouter


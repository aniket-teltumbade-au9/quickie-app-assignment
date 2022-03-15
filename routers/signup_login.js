var router = require('express')
const { registerUser, login } = require('../controllers/signup_login')
const { authVerify } = require('../helper/authVerify')

var UserRouter = router.Router()

UserRouter.post('/register', registerUser)
UserRouter.post('/login', login)

module.exports = UserRouter
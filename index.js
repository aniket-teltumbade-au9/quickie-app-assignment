const bodyParser = require('body-parser')
var express = require('express')
const db = require('./db')
const FriendListRouter = require('./routers/friendlist')
const PostRouter = require('./routers/my-profile')
const UserRouter = require('./routers/signup_login')
require('dotenv').config()
const path = require('path')

var app = express()
var port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')))

db()

app.use('/signup_login', UserRouter)
app.use('/friendlist', FriendListRouter)
app.use('/myprofile', PostRouter)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port} `)
})
const bodyParser = require('body-parser')
var express = require('express')
const db = require('./db')
const UserRouter = require('./routers/signup_login')
require('dotenv').config()

var app = express()
var port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db()

app.use('/signup_login', UserRouter)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port} `)
})
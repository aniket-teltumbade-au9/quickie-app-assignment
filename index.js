const bodyParser = require('body-parser')
var express = require('express')


var app = express()
var port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port} `)
})
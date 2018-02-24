/*
 * @Author: Thys Smit 
 * @Date: 2017-11-23 11:48:04 
 * @Last Modified by: Thys Smit
 * @Last Modified time: 2017-12-05 15:05:14
 */

var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var config = require('./config.js')
var sql = require('mssql')

var config = {
    user: '',
    password: '',
    server: '',
    database: ''
}

var pageRouter = require('./routes/pageRouter.js')
var uploadRouter = require('./routes/uploadRouter.js')
var sqlRouter = require('./routes/sqlRouter.js')

var app = express()


var msSQLInstance = sql.connect(config, function(err,result) {
    if (err) console.log("Connection could not be made." + err)
    else console.log("Connection has been established to " + config.database)
})

app.use(bodyParser.json()) // Allow JSON to be parsed within a payload.
app.use(bodyParser.urlencoded({ extended: false })) // Allow URL encoded messages to be parsed within a payload.
app.use(bodyParser.text()) // Allow plain text to be parsed within a payload.

app.use(express.static(__dirname + '/views')) // Serve the views folder.
app.use(express.static(__dirname + '/scripts')) // Serve the client side javascript.

app.use(pageRouter )// Register the page router to express.
app.use(uploadRouter) // Register the upload router to express.
app.use(sqlRouter) // Register the sql router to express.

// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Create the server.
var server = app.listen(2022, function () {
    console.log('Server listening on port ' + server.address().port)
})

module.exports = app

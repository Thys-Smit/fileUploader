var express = require('express')
var router = express.Router()

// Get all the users.
router.get('/API/backup/', function (req, res) {
    return res.status(200).send('Hello World!')
})

module.exports = router
var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
var fs = require('fs')

// Get all the users.
router.post('/API/upload/', upload.single('image'), function (req, res, next) {
    //return res.status(200).send('Test')
    if (req.file !== null){
        return res.status(200).send('The upload file named ' + req.file.originalname + ' has been saved to ' + req.file.destination)
    }
    else{
        return res.status(200).send('The upload file was not saved') 
    }
})

router.get('/API/getFiles/',  function (req, res) {
    fs.readdir(__dirname, function (err, files){
        if (err){
            throw err;
        }

        files.forEach(function(file){
            console.log(file)
        })
    })
    return res.status(200).send('Complete')
})

module.exports = router
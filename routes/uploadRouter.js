/*
 * @Author: Thys Smit 
 * @Date: 2017-11-23 11:48:20 
 * @Last Modified by: Thys Smit
 * @Last Modified time: 2017-11-23 15:45:47
 */

var express = require('express')
var router = express.Router()
var storageEngine = require('../helpers/storageEngine.js')
var fs = require('fs')

var path = require('path')
var uploadDir = path.join(__dirname, '../uploads')

// Upload files endpoint
router.post('/API/upload/',  function (req, res) {
    //Set storage options
    var storageOptions = storageEngine.setStorageOptionsFN(uploadDir)
    var options = {storage:storageOptions}
    //Call file upload method
    storageEngine.multiUploadFN(req, res, options,'image', 3, function (error, result) {
        if (error)
            res.status(400).send('Multi Upload Failed : ' + error)
        else
            res.status(200).send(result)
    })
})

// Get uploaded files
router.get('/API/getFiles/',  function (req, res) {
    var fileNames = []
    fs.readdir(uploadDir, function (err, files){
        if (err) {
            throw err;
        }
        return res.status(200).send(JSON.stringify(files))
    })
    
})

module.exports = router
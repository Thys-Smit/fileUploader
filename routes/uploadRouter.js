/*
 * @Author: Thys Smit 
 * @Date: 2017-11-23 11:48:20 
 * @Last Modified by: Thys Smit
 * @Last Modified time: 2017-11-27 10:06:57
 */

var express = require('express')
var router = express.Router()
var storageEngine = require('../helpers/storageEngine.js')
var fs = require('fs')

var path = require('path')
var uploadDir = path.join(__dirname, '../uploads')

// Upload files endpoint
router.post('/API/upload/',  function (req, res) {
    
    //Set upload options
    var storageOptions = storageEngine.setStorageOptionsFN(uploadDir)
    var filterOptions = storageEngine.setFilterOptionsFN([".png",".jpg"])
    var options = {storage:storageOptions, fileFilter:filterOptions}

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
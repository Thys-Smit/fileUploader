/*
 * @Author: Thys Smit 
 * @Date: 2017-11-23 11:48:20 
 * @Last Modified by: Thys Smit
 * @Last Modified time: 2017-12-04 16:48:46
 */

var express = require('express')
var router = express.Router()
var storageEngine = require('../helpers/storageEngine.js')
var fs = require('fs')

var path = require('path')
var uploadDir = path.join(__dirname, '../uploads')

// Upload multiple files from same field
router.post('/API/multiUploadToDisk/',  function (req, res) {
    
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


// Upload mutliple files from multiple fields
router.post('/API/multiFieldUploadToDisk/',  function (req, res) {
    
    //Set upload options
    var storageOptions = storageEngine.setStorageOptionsFN(uploadDir)
    var filterOptions = storageEngine.setFilterOptionsFN([".png",".jpg"])
    var options = {storage:storageOptions, fileFilter:filterOptions}
    var fields = [{name: 'image', maxCount: 2}, {name: 'test', maxCount: 1}]

    //Call file upload method
    storageEngine.multiFieldUploadFN(req, res, options, fields, function (error, result) {
        if (error)
            res.status(400).send('Multi Upload Failed : ' + error)
        else
            res.status(200).send(result)
    })
})


// Upload a single file from a single field
router.post('/API/singleUploadToDisk/',  function (req, res) {
    
    //Set upload options
    var storageOptions = storageEngine.setStorageOptionsFN(uploadDir)
    var filterOptions = storageEngine.setFilterOptionsFN([".png",".jpg"])
    var options = {storage:storageOptions, fileFilter:filterOptions}
    
    //Call file upload method
    storageEngine.singleUploadFN(req, res, options, 'image', function (error, result) {
        if (error)
            res.status(400).send('Single Upload Failed : ' + error)
        else
            res.status(200).send(result)
    })
})


router.post('/API/multiFieldUploadToSQL', function(req,res){
    
    //Set upload options
    var storageOptions = storageEngine.setStorageOptionsFN(uploadDir)
    var filterOptions = storageEngine.setFilterOptionsFN([".png",".jpg"])
    var options = {storage:storageOptions, fileFilter:filterOptions}
    var fields = [{name: 'image', maxCount: 2}, {name: 'test', maxCount: 1}]

    //Call file upload method
    storageEngine.multiFieldUploadSQLFN(req, res, options, fields, function (error, result) {
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
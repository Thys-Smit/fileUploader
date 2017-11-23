/*
 * @Author: Thys Smit 
 * @Date: 2017-11-23 11:48:11 
 * @Last Modified by: Thys Smit
 * @Last Modified time: 2017-11-23 15:39:16
 */

var express = require('express')
var multer = require('multer')

//Set the file name and save directory 
function setStorageOptions (storagePath, fileName){
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, storagePath)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
}

//Function to upload multiple files
function multiUpload(req, res, storageOptions, tagName, maxCount, callback) {
    var upload = multer({storage: storageOptions}).array(tagName, maxCount)
    upload(req, res, function (err) {
        if (err) {
            return callback(err, null)
        }
        
        return callback(err, 'The selection of files has been uploaded to ' + req.files[0].destination)
    })    
}

//Function to upload single files
function singleUpload(req, res, storageOptions, tagName, callback) {
    var upload = multer({storage: storageOptions}).single(tagName)
    upload(req, res, function (err) {
        if (err) {
            return callback(err, null)
        }
        
        return callback(err, 'The file named ' + req.file.originalname + ' has been uploaded to ' + req.file.destination)
    })    
}


//Include functions to export in the below object array 
var exportFunctions = {multiUploadFN: multiUpload, singleUploadFN: singleUpload, setStorageOptionsFN: setStorageOptions}

module.exports = exportFunctions

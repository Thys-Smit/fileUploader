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

//Important TODO: If 2 files are sent and one of them already exists and there is a error, the one that was getting replaced is removed.
//Files wiith diferent field names should not be passed to the multiUpload function.

//Function to upload multiple files
function multiUpload(req, res, options, fieldName, maxCount, callback) {
    var upload = multer(options).array(fieldName, maxCount)
    upload(req, res, function (err) {
        if (err) {
            return callback(err, null)
        }
        //Error TODO I got this returned even though the file did not upload. Req was empty. Do a Check 
        return callback(err, 'The selection of files has been uploaded to ' + req.files[0].destination)
    })    
}

//Function to upload single files
function singleUpload(req, res, storageOptions, fieldName, callback) {
    var upload = multer({storage: storageOptions}).single(fieldName)
    upload(req, res, function (err) {
        if (err) {
            return callback(err, null)
        }
        
        return callback(err, 'The file named ' + req.file.originalname + ' has been uploaded to ' + req.file.destination)
    })    
}

function fileFilter (req, file, cb) {
    
      // The function should call `cb` with a boolean
      // to indicate if the file should be accepted
        
      // To reject this file pass `false`, like so:
      cb(null, false)
    
      // To accept the file pass `true`, like so:
      cb(null, true)
    
      // You can always pass an error if something goes wrong:
      cb(new Error('I don\'t have a clue!'))
    
    }


//Include functions to export in the below object array 
var exportFunctions = {multiUploadFN: multiUpload, singleUploadFN: singleUpload, setStorageOptionsFN: setStorageOptions}

module.exports = exportFunctions

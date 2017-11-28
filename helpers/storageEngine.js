
/*
 * @Author: Thys Smit 
 * @Date: 2017-11-23 11:48:11 
 * @Last Modified by: Thys Smit
 * @Last Modified time: 2017-11-28 10:44:53
 */

var express = require('express')
var multer = require('multer')
var path = require('path')
var filesTest = []

//Important TODO: If 2 files are sent and one of them already exists and there is a error, the one that was getting replaced is removed.
//Files wiith diferent field names should not be passed to the multiUpload function.

//Function to upload multiple files
function multiUpload(req, res, options, fieldName, maxCount, callback) {
    var upload = multer(options).array(fieldName, maxCount)
    upload(req, res, function (err) {
        if (err) 
            return callback(err, null)
        else
            return callback(err, 'The selection of files has been uploaded')
    })    
}


//Function to upload multiple files from multiple fields
function multiFieldUpload(req, res, options, fields, callback) {
    var upload = multer(options).fields(fields)
    upload(req, res, function (err) {
        if (err) 
            return callback(err, null)
        else
            return callback(err, 'The selection of files has been uploaded') 
    })    
}


//Function to upload single files
function singleUpload(req, res, options, fieldName, callback) {
    var upload = multer(options).single(fieldName)
    upload(req, res, function (err) {
        if (err) 
            return callback(err, null)
        else
            return callback(err, 'The file named ' + req.file.originalname + ' has been uploaded to ' + req.file.destination) 
    })    
}


//#region Options

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

// 
function setFilterOptions (acceptedFiles) {
    
    return function(req, file, cb, filesCheck){
        filesCheck = acceptedFiles
        if (typeof filesCheck === 'undefined' || filesCheck === null)
            return cb(null,true)

        var ext = path.extname(file.originalname)
        var extMatch = false

        filesCheck.forEach(function validFile(fileExt,index){
            if (ext === fileExt){
                extMatch = true
                return cb(null,true)
            }  
            
            if(index === filesCheck.length - 1 && !extMatch)
                return cb(new Error("The file type \'" + ext + "\' is not permitted for upload"),false)
            
        },ext)
        
    }
}
//#endregion


//Include functions to export in the below object array 
var exportFunctions = {multiUploadFN: multiUpload, singleUploadFN: singleUpload, setStorageOptionsFN: setStorageOptions, setFilterOptionsFN: setFilterOptions, multiFieldUploadFN: multiFieldUpload}

module.exports = exportFunctions

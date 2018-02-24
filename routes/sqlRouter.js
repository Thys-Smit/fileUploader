var express = require('express')
var router = express.Router()
const sql = require('mssql')
   
router.get('/API/GetResults', function(req,res){
    
    sql.connect(config, err => {
        new sql.Request().query('SELECT * FROM FileWarehouse', (err, result) => {
            if (err){
                console.log(err)
            }
            else{
                console.log(result)
                res.status(200).send(result)
            }
            sql.close()
            console.log("Connection Closed")
        })
        if (!err){
            console.log("Connection Established")
        }
    })
    
})

router.get('/API/GetResultsSP', function(req,res){
    
    sql.connect(config, err => {
        new sql.Request()
        // .input('input_parameter', sql.Int, value)
        // .output('output_parameter', sql.VarChar(50))
        .execute('GetFiles', (err, result) => {
            console.log(result)
            sql.close()
            res.status(200).send(result)
        })
    })
    
})

module.exports = router

var express = require('express')
var router = express.Router()
const sql = require('mssql')

var config = {
    user: 'sa',
    password: 'C@r@bTekniva',
    server: 'localhost\\DEV',
    database: 'Media Server'
}

 // async () => {
    //     try {
    //         const pool = await sql.connect(config)
    //         const result = await sql.query`select * from FileWarehouse`
    //         console.log(result)
    //     } catch (err) {
    //         console.log(err)
    //         // ... error checks
    //     }
    // }
   
router.get('/API/GetResults', function(req,res){
    
    // const pool = new sql.ConnectionPool({
    //     user: 'sa',
    //     password: 'C@r@bTekniva',
    //     server: 'LW7ZAPTA02THYSS\\DEV',
    //     database: 'Media Server'
    // })

    // pool.connect(err => {
    //     if(err)
    //         console.log(err)
    //     else
    //         console.log("Connection Established")
    // })

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
    //sql.close()
})

module.exports = router
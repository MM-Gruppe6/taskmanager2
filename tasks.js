var express = require('express');
var router = express.Router();
var db = require('./dbconnect'); //database
var bodyParser = require('body-parser').text();

//endpoint: get travels -----------------------------
router.get('/', bodyParser, function (req, res) {   
    
    var sql = "SELECT * FROM tasks";
    
    //INSERT INTO travels VALUES(DEFAULT, $2, $3, $4, $5)
    
    //console.log(sql)
    
    db.any(sql).then(function(data) {
        
        //db.any("DEALLOCATE insert_task");        
        res.status(200).json(data); //success!

    }).catch(function(err) {        
        
        res.status(500).json(err);
         
    });   
});

//endpoint: POST travels -----------------------------
router.post('/', bodyParser, function (req, res) {   
    
    var upload = JSON.parse(req.body);
    
    console.log(upload);
    //Note. the uploaded data should also be sanitized for any malicious code, e.g. use the module ‘sanitize-html’
    
    var sql = `PREPARE insert_task (int, int, text, text, timestamp) AS
                INSERT INTO tasks VALUES(DEFAULT, $2, $3, $4, $5); EXECUTE insert_task
                (0, 1, '${upload.tittel}', '${upload.beskrivelse}', '2017-11-03 13:00')`;
    
    //var sql = "INSERT INTO tasks VALUES (DEFAULT, 1, 'dsfdf', 'sdfss', '2016-11-22 12:00')";
    
    //var sql = "SELECT * FROM tasks";
    
    //INSERT INTO travels VALUES(DEFAULT, $2, $3, $4, $5)
    
    console.log(sql)
    
    db.any(sql).then(function(data) {
        
        //db.any("DEALLOCATE insert_task");        
        res.status(200).json({msg: "insert ok"}); //success!

    }).catch(function(err) {        
        
        res.status(500).json(err);
        
    });   
});
    
//endpoint: DELETE travels -----------------------------
router.delete('/', function (req, res) {      

    var upload = req.query.travelid; //uploaded data should be sanitized

    var sql = `PREPARE delete_task (int) AS
            DELETE FROM tasks WHERE id=$1 RETURNING *;
            EXECUTE delete_task('${upload}')`;   

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE delete_tasks");       

        if (data.length > 0) {
            res.status(200).json({msg: "delete ok"}); //success!
        }
        else {
            res.status(200).json({msg: "can't delete"});
        }       

    }).catch(function(err) {
        res.status(500).json(err);        
    });   
});

//export module 
module.exports = router;

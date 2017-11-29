var express = require('express');
var router = express.Router();
var db = require('./dbconnect'); //database
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");

var secret = "frenchfriestastegood!"; //used to check the token
var logindata; //logindata from the token

//Authorize all travel-endpoints --------------------
router.use(function (req, res, next) {    
    
    //get the token from the URL-variable named 'token'
    var token = req.query['token']; 

    if (!token) {
        res.status(403).json({msg: "No token received"}); //send
        return; //quit
    }
    else {
        try {
          logindata = jwt.verify(token, secret); //check the token
        }
        catch(err) {
          res.status(403).json({msg: "The token is not valid!"}); //send
          return; //quit
        }
    }
    
    next(); //we have a valid token - go to the requested endpoint
});


//endpoint: get travels -----------------------------
router.get('/', bodyParser, function (req, res) {   
    
   var sql = `PREPARE get_task (text) AS
            SELECT * FROM taskview WHERE brukernavn=$1;
            EXECUTE get_task('${logindata.brukernavn}')`;
    
    
    //INSERT INTO travels VALUES(DEFAULT, $2, $3, $4, $5)
    
   
    
    db.any(sql).then(function(data) {
        
        db.any("DEALLOCATE insert_task");        
        res.status(200).json(data); //success!

    }).catch(function(err) {        
        
        res.status(500).json(err);
        
    });   
});

//endpoint: POST travels -----------------------------
router.post('/', bodyParser, function (req, res) {   
    
    var upload = JSON.parse(req.body);
    //Note. the uploaded data should also be sanitized for any malicious code, e.g. use the module ‘sanitize-html’
    
    var sql = `PREPARE insert_task (int, text, text, timestamp, text) AS
        INSERT INTO tasks VALUES(DEFAULT, $2, $3, $4, $5);
        EXECUTE insert_task (0, '${upload.tittel}', '${upload.beskrivelse}', '2017-11-10 12:00', '${logindata.brukernavn}')`;
    
    console.log(sql)
    
    
    
    console.log(sql)
    
    db.any(sql).then(function(data) {
        
        db.any("DEALLOCATE insert_task");        
        res.status(200).json({msg: "insert ok"}); //success!

    }).catch(function(err) {        
        
        res.status(500).json(err);
        
    });   
});
    
//endpoint: DELETE travels -----------------------------
router.delete('/', function (req, res) {      

    var upload = req.query.taskid; //uploaded data should be sanitized

    var sql = `PREPARE delete_task (int, text) AS
        DELETE FROM tasks WHERE id=$1 AND brukernavn=$2 RETURNING *;
        EXECUTE delete_task('${upload}', '${logindata.brukernavn}')`;
    
    
    console.log(sql)

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE delete_task");       

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

var express = require('express');
var router = express.Router();
var db = require('./dbconnect'); //database
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');

var secret = "frenchfriestastegood!"; //used to create the token

                     
//endpoint: POST users 
router.post('/', bodyParser, function (req, res) {

    var upload = JSON.parse(req.body);  //should be sanitized
    var encrPassw = bcrypt.hashSync(upload.passord, 10); //hash the password    

    var sql = `PREPARE insert_user (int, text, text, text, text) AS
                INSERT INTO bruker VALUES(DEFAULT, $2, $3, $4, $5); EXECUTE insert_user
                (0, '${upload.brukernavn}', '${upload.epost}', '${encrPassw}', '${upload.navn}')`;    
    
    db.any(sql).then(function(data) {

        db.any("DEALLOCATE insert_user");
        
        //create the token        
        var payload = {brukernavn: upload.brukernavn, epost: upload.epost, navn: upload.navn,};
        var tok = jwt.sign(payload, secret, {expiresIn: "3h"});

        //send logininfo + token to the client
        res.status(200).json({brukernavn: upload.brukernavn, epost: upload.epost, navn: upload.navn,  token: tok}); 

    }).catch(function(err) {

        res.status(500).json({err});

    });
});


//Autoriserer bruker
//endpoint for login: POST users/auth/
router.post('/auth/', bodyParser, function (req, res) {
    
    var upload = JSON.parse(req.body); //should be sanitized
    
    var sql = `PREPARE get_user (text) AS
                    SELECT * FROM bruker WHERE brukernavn=$1;
                    EXECUTE get_user('${upload.brukernavn}')`;
    
    console.log(sql);

        db.any(sql).then(function(data) {

        db.any("DEALLOCATE get_user");

        //if wrong user or password -> quit  
        if (data.length <= 0) {
            res.status(403).json({msg: "Brukernavn eller passord eksisterer ikke"}); //send
            return; //quit
        } else {
            
            //check if the password is correct
            var psw = upload.passord;
            var encPsw = data[0].passord;
            var result = bcrypt.compareSync(psw, encPsw);
            
            if (!result) {
                res.status(403).json({msg: "Feil passord"}); //send
                return; //quit
            }            
        }
            
        //we have a valid user -> create the token        
        var payload = {brukernavn: data[0].brukernavn, epost: data[0].epost, navn: data[0].navn};
        var tok = jwt.sign(payload, secret, {expiresIn: "12h"});

        //send logininfo + token to the client
        res.status(200).json({brukernavn: data[0].brukernavn, epost: data[0].epost,navn: data[0].navn, token: tok});

    }).catch(function(err) {

        res.status(500).json({err});
        
    });    
});
    
//export module -------------------------------------
module.exports = router;

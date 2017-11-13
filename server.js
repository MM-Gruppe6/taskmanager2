const express = require('express');
const app = express(); //server-app

var pgp = require('pg-promise')();

var db = pgp('postgres://mrkzqengigyvmy:6061543bdd29cacf8345e7c961e76dbed61cd373e553899b5a108abf25493d08@:ec2-54-247-123-130.eu-west-1.compute.amazonaws.com:5432/d9hrc499slemoh');
 
app.get('/', function (req, res) {
    
    //set headers
    res.set('Access-Control-Allow-Origin', '*'); 
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    var sql = 'SELECT * FROM travelsview'; //SQL query

    //execute the SQL query    
    db.any(sql).then(function(data) {        
        
        res.status(200).json(data); //success – send the data as JSON!

    }).catch(function(err) {      
        
        res.status(500).json(err);
        
    });  
});

app.listen(8080, function () {
  console.log('Server listening on port 3000!');
});

var express = require('express');
var router = express.Router();
var db = require('./dbconnect'); //database


//endpoint: GET tasks 
router.get('/', function (req, res) {   
    
    
    //OBS må lage et taskview!!!
    //SELECT * fra en hviss bruker FROM taskview
    var sql = 'SELECT * FROM taskview';
    db.any(sql).then(function(data) {        
        
        res.status(200).json(data); //success – send the data as JSON!

    }).catch(function(err) {        
        
        res.status(500).json(err);
        
    });   
});

//export module 
module.exports = router;

const express = require('express');
const app = express(); //server-app




// global for all routes -------------------------
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next(); //go to the specified route
});


app.use(express.static(__dirname + '/public'));

var tasks = require('./tasks.js');
app.use('/taskmanager2/tasks/', tasks);

//Not yet implemented:
var bruker = require('./bruker.js');
app.use('/taskmanager2/bruker/', bruker);

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Server listening on port 8080!');    
});
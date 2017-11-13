const express = require('express');
const app = express(); //server-app

// global for all routes -------------------------
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next(); //go to the specified route
});

// -----------------------------------------------
//route handling is delegated to:
var tasks = require('/tasks.js');
app.use('/tasks/', tasks);

//Not yet implemented:
//var users = require('./users.js');
//app.use('/travellog/users/', users);

//------------------------------------------------
app.listen(8080, function () {
  console.log('Server listening on port 8080!');
});

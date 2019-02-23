
//region require dependencies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var routesApi = require('./api/routes/index');
//endregion

//region configuration from environment
var port = process.env.port || 4000;
//endregion

//region connect to db and configure login stratigies
// connect mongoose to real database connection
require('./api/models/db');
//endregion

//region configure express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Initialise Passport before using the route middleware
app.use(passport.initialize());

// Use the API routes when path starts with /api

app.use('/api', routesApi);
//endregion

//region Exceptions and errors
//catch un handled exceptions
app.use(function(err, req, res, next) {
    console.log(err.message)
    res.status(500).json({error:err.message});
});


// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {

    res.status(404).send();
});
//endregion

 app.listen(port, function(){

     console.log("Running on port"+port);


}); 


module.exports = app;


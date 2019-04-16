var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var routesApi = require('./api/routes/index');

var port = process.env.port || 4000;

require('./api/models/db');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());


app.use('/api', routesApi);

app.use(function(err, req, res, next) {
    console.log(err.message)
    res.status(500).json({error:err.message});
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

app.use(function(req, res, next) {

    res.status(404).send();
});

 app.listen(port, function(){

     console.log("Running on port"+port);
}); 


module.exports = app;


var mongoose = require('mongoose');
const config = require('../config/config');
var dbURI = config.development.mongodb.dburl;
// var dbURI = 'mongodb://localhost/meanAuth';
/*
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}*/
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});


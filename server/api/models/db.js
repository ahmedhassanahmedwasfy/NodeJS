var mongoose = require('mongoose');
var dbURI = 'mongodb+srv://sa:010203010203@cluster0-9tqii.gcp.mongodb.net/MyDoctor?retryWrites=true';
// var dbURI = 'mongodb://localhost/meanAuth';

if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});
 
  // BRING IN YOUR SCHEMAS & MODELS
  //require('./users');

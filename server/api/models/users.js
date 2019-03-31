var mongoose = require( 'mongoose' );
// var crypto = require('crypto');
// var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name_EN: {
    type: String,
    required: true
  },
  name_AR: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  permissions: [],
  groups: []
});

module.exports= mongoose.model('users', userSchema);

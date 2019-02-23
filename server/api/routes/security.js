var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlAuth =  require('../controllers/authentication');

// authentication
router.post('/register',
    function(req,res){
       ctrlAuth.register(req,res)
    }
  );
router.post('/login',
    function(req,res){
      ctrlAuth.login(req,res)
    });


module.exports = router;


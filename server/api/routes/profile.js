var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
var ctrlProfile = require('../controllers/profile');
// profile
router.get('/profile', auth, ctrlProfile.profileRead);

module.exports = router;


var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profile');
const securityUtility = require('../utilities/Security')


router.get('/userProfile', function(req,res){
    ctrlProfile.userProfile(req,res)
});

router.post('/userProfile', function(req,res){
    ctrlProfile.editProfile(req,res)
});


module.exports = router;


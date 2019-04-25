var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profile');
const securityUtility = require('../utilities/Security')
var {google} = require("googleapis");
var drive = google.drive("v3");
var key = require("../utilities/privatekey");
var path = require("path");
var fs = require("fs");
var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });


router.get('/userProfile', function(req,res){
    ctrlProfile.userProfile(req,res)
});

router.post('/userProfile', function(req,res){
    ctrlProfile.editProfile(req,res)
});

router.post('/userProfile/uploadImage',upload.single('image'), function(req,res){
    ctrlProfile.uploadImage(req,res)
});

router.get('/userProfile/ProfileImage', function(req,res){
    ctrlProfile.getUserProfileImage(req,res)
});


module.exports = router;


var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profile');
const securityUtility = require('../utilities/Security')


router.get('/userProfile', ctrlProfile.userProfile);


module.exports = router;


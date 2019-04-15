var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profile');
const securityUtility = require('../utilities/Security')


// router.get('/userProfile', securityUtility.verifyToken('sss'), function (req, res) {
//     ctrlProfile.userProfile(req, res)
// });


module.exports = router;


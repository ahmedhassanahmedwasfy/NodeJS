var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profile');
// profile
router.get('/profile/:id', ctrlProfile.profileRead);

module.exports = router;


var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');

var ctrlAuth =  require('../controllers/authentication');
var ctrlPermission =  require('../controllers/permission');
var ctrlGroup =  require('../controllers/group');

// authentication
router.post('/register', function(req,res){
       ctrlAuth.register(req,res)
    });

router.post('/login', function(req,res){
      ctrlAuth.login(req,res)
    });


///////////Permissions////////////

router.get('/permissions', function(req,res){
    ctrlPermission.index(req,res)
});

router.get('/permissions/view/:permission_id', function(req,res){
    ctrlPermission.view(req,res)
});

router.post('/permissions/add', function(req,res){
        ctrlPermission.new(req,res)
    });

router.post('/permissions/update/:permission_id', function (req, res) {
    ctrlPermission.update(req,res)});

router.delete('/permissions/delete/:permission_id', function (req, res) {
    ctrlPermission.delete(req,res)});


///////////Groups////////////

router.get('/groups', function(req,res){
        ctrlGroup.index(req,res)
    });

router.get('/groups/group_id', function (req, res) {
    ctrlGroup.view(req, res)

});

router.post('/groups', function(req,res){
        ctrlGroup.new(req,res)
    });

router.post('/groups/group_id', function(req,res){
    ctrlGroup.update(req, res)
});

router.post('/groups/group_id', function (req, res) {
    ctrlGroup.delete(req, res)
});





module.exports = router;


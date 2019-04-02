var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');

var ctrlAuth =  require('../controllers/authentication');
var ctrlPermission =  require('../controllers/permission');
var ctrlGroup =  require('../controllers/group');
var ctrlUser =  require('../controllers/user');


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

router.get('/permissions/view/:id', function(req,res){
    ctrlPermission.view(req,res)
});

router.post('/permissions/update', function (req, res) {
    ctrlPermission.update(req,res)});

router.delete('/permissions/delete/:id', function (req, res) {
    ctrlPermission.delete(req,res)});


///////////Groups////////////

router.get('/groups', function(req,res){
        ctrlGroup.index(req,res)
    });

router.get('/groups/view/:id', function (req, res) {
    ctrlGroup.view(req, res)

});

router.post('/groups/update', function(req,res){
    ctrlGroup.update(req, res)
});

router.delete('/groups/delete/:id', function (req, res) {
    ctrlGroup.delete(req, res)
});


///////////User////////////
///////////User////////////

router.get('/users', function(req,res){
    ctrlUser.index(req,res)
});

router.get('/users/view/:id', function (req, res) {
    ctrlUser.view(req, res)

});

router.post('/users/update', function(req,res){
    ctrlUser.update(req, res)
});

router.delete('/users/delete/:id', function (req, res) {
    ctrlUser.delete(req, res)
});

module.exports = router;


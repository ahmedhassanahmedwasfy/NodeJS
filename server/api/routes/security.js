var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var interceptor = require('../utilities/Interceptors');
var ctrlAuth = require('../controllers/authentication');
var ctrlPermission = require('../controllers/permission');
var ctrlGroup = require('../controllers/group');
var ctrlUser = require('../controllers/user');
const enum_permissions=require('../enums/enum_permissions')

// authentication
router.post('/register', function (req, res) {
    ctrlAuth.register(req, res)
});

router.post('/login', function (req, res) {
    ctrlAuth.login(req, res)
});

router.post('/forgetPassword', function (req, res) {
    ctrlAuth.forgetPassword(req, res)
});

router.get('/resetPassword/:token', function (req, res) {
    ctrlAuth.resetPassword(req, res)
});

router.post('/resetPassword/:token', function (req, res) {
    ctrlAuth.saveNewPassword(req, res)
});


///////////Permissions////////////

// router.get('/permissions',interceptor.verifyToken,function(req,res,next){interceptor.requirePermission(enum_permissions.ADD_EDIT_PERMISSION,req,res,next)} , function (req, res) {
    router.get('/permissions' , function (req, res) {
    ctrlPermission.index(req, res)
});

// router.get('/permissions/view/:id',interceptor.verifyToken, function(req,res,next){interceptor.requirePermission(enum_permissions.ADD_EDIT_PERMISSION,req,res,next)}, function (req, res) {
    router.get('/permissions/view/:id', function (req, res) {
    ctrlPermission.view(req, res)
});

// router.post('/permissions/update',interceptor.verifyToken, function(req,res,next){interceptor.requirePermission(enum_permissions.ADD_EDIT_PERMISSION,req,res,next)}, function (req, res) {
    router.post('/permissions/update',  function (req, res) {
    ctrlPermission.update(req, res)
});

// router.delete('/permissions/delete/:id',interceptor.verifyToken, function(req,res,next){interceptor.requirePermission(enum_permissions.ADD_EDIT_PERMISSION,req,res,next)}, function (req, res) {
    router.delete('/permissions/delete/:id',function (req, res) {
    ctrlPermission.delete(req, res)
});


///////////Groups////////////

router.get('/groups',interceptor.verifyToken, function (req, res) {
    ctrlGroup.index(req, res)
});

router.get('/groups/view/:id',interceptor.verifyToken, function (req, res) {
    ctrlGroup.view(req, res)
});

router.post('/groups/update',interceptor.verifyToken, function (req, res) {
    ctrlGroup.update(req, res)
});

router.delete('/groups/delete/:id',interceptor.verifyToken, function (req, res) {
    ctrlGroup.delete(req, res)
});

///////////User////////////

router.get('/users',interceptor.verifyToken, function (req, res) {
    ctrlUser.index(req, res)
});

router.get('/users/view/:id',interceptor.verifyToken, function (req, res) {
    ctrlUser.view(req, res)
});

router.post('/users/update',interceptor.verifyToken, function (req, res) {
    ctrlUser.update(req, res)
});

router.delete('/users/delete/:id',interceptor.verifyToken, function (req, res) {
    ctrlUser.delete(req, res)
});


module.exports = router;


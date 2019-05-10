var express = require('express');
var router = express.Router();
var interceptor = require('../utilities/Interceptors');

var cartApi = require('./cart');
var productApi = require('./product');
var profileApi = require('./profile');
var securityApi = require('./security');


router.use('/cart',interceptor.verifyToken,cartApi)
router.use('/product',interceptor.verifyToken,productApi)
router.use('/security',securityApi)
router.use('/user',interceptor.verifyToken,profileApi)
router.get('/test',function(req,res){return res.status(200).json('welcome!')})

module.exports=router;

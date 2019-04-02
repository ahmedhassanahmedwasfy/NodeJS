var express = require('express');
var router = express.Router();
var interceptor = require('../utilities/Interceptors');

var cartApi = require('./cart');
var productApi = require('./product');
var profileApi = require('./profile');
var securityApi = require('./security');


router.use('/cart',cartApi)
router.use('/product',interceptor.verifyToken,productApi)
router.use('/user',profileApi)
router.use('/security',securityApi)

module.exports=router;

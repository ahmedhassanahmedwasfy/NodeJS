var express = require('express');
var router = express.Router();

var ctrlshoopingCart = require ('../controllers/shopping-cart');


router.get('/add-to-cart/:id', ctrlshoopingCart.addToCart)

module.exports = router;


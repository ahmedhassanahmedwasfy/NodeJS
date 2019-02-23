var express = require('express');
var router = express.Router();

var ctrlProduct = require('../controllers/product');

router.post('/products', ctrlProduct.new );
router.get('/products', ctrlProduct.index );

module.exports = router;
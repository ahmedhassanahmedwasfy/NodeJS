var Product = require ('../models/products');
const mongoose = require('mongoose');
var Cart = require ('../models/cart');



exports.addToCart = function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product){
        if(err){
            return res.redirect('/');
        }

        cart.add(product, productId);
        req.session.cart = cart;
        console.log(req.session.cart)
        res.redirect('/');
    });
}
var Product = require ('../models/products');
const mongoose = require('mongoose');

exports.index = function(req, res, next){
    Product.find(function(err, products){
        if(err){
            res.json({
                status: "Error",
                message: err
            });
        }

        res.json({
            status: "Success",
            message: "products retrieved successfully",
            data: products
        });
    });
};

exports.new = function(req, res, next){


    var product = new Product();

    product.name=req.body.name;
    product.price=req.body.price;
    product.category=req.body.category;
    product.quantity=req.body.quantity;
    product.image=req.body.image;
    product.description=req.body.description;

    product.save(function(err){
        if(err)
            res.json(err);
        res.json({
            message: "Product Created successfully",
            data: product
        });

    });

    exports.view = function(req, res, next){
        Product.findById(req.params.product_id, function(err, product){
            if(err)
                res.send(err)
            res.json({
                message:"Product Details Loading...",
                data: product
            });

        });
    };

    exports.update = function(req, res, next){
        Product.update({"_id": req.params.product_id},req.body)
            .lean()
            .exec(
                function(err, doc){
                    if (err)
                        res.send(err);
                    else
                        return res.json({doc})
                }
            );
    };

    exports.delete = function(req, res){
        Product.remove({
                _id: req.params.product_id
            },
            function (err, product){
                if (err)
                    res.send(err);
                res.json({
                    status: "success",
                    message: "Product Deleted"

                });
            });
    };



}
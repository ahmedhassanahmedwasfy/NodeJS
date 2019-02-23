
var Product = require('../models/products');
var mongoose = require (mongoose);
// mongoose.connec('//localhost/meanAuth');
var products = [ 
    new Product({
    name: 'Gothic Video Game',
    price: 10,
    category: 'Medium',
    quantity: 5,
    image: 'jhbdjsfjnsjn',
    description: 'Awesom Game'
    }),
    new Product({
        name: 'Gothic Video Game',
        price: 10,
        category: 'Medium',
        quantity: 5,
        image: 'jhbdjsfjnsjn',
        description: 'Awesom Game'
    }),
    new Product({
        name: 'Gothic Video Game',
        price: 10,
        category: 'Medium',
        quantity: 5,
        image: 'jhbdjsfjnsjn',
        description: 'Awesom Game'
    }),
    new Product({
        name: 'Gothic Video Game',
        price: 10,
        category: 'Medium',
        quantity: 5,
        image: 'jhbdjsfjnsjn',
        description: 'Awesom Game'
    }),
];
/* var done = 0;
for (var i = 0; i<products.length; i++){
    products[i].save(function(error, result){
        done++;
        if(done===products.length){
            exit();

        }
    });

}

function exit(){
    mongoose.disconnect();
} */

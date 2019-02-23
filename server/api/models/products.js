var mongoose = require( 'mongoose' );


var productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    quantity: Number,
    image: String,
    description: String
});

module.exports = mongoose.model('products', productSchema);

const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    title: String
});

module.exports = mongoose.model('categories', categorySchema);
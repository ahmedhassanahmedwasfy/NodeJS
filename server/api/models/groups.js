var mongoose = require( 'mongoose' );

var groupsSchema = new mongoose.Schema({
    name_EN: {
        type: String,
        unique: true,
        required: true
    },
    name_AR: {
        type: String,
        required: true
    },
    permissions: []

});

module.exports= mongoose.model('groups', groupsSchema);

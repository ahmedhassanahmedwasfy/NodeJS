var mongoose = require( 'mongoose' );

var permissionSchema = new mongoose.Schema({
    name_EN: {
        type: String,
        unique: true,
        required: true
    },
    name_AR: {
        type: String,
        required: true
    }

});

module.exports= mongoose.model('permissions', permissionSchema);

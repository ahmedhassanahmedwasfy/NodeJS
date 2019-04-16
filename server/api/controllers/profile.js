var mongoose = require('mongoose');
var User = require('../models/users');


module.exports.userProfile = async function(req, res) {
    await User.findOne({ _id: req.user._id },
        (err, user) => {
            if (!user)
                return res.status(500).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user});
            console.log(user)
        }
    );
}

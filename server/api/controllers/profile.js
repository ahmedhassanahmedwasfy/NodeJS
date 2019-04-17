var mongoose = require('mongoose');
var User = require('../models/users');
var MongooseRepository = require('../Repository/MongooseRepository');
var UserRepo = new MongooseRepository('users');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
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


module.exports.editProfile = async function(req, res) {
    let {error, result} = await UserRepo.update(req.body)
    if (error) {
        res.status(500).send("unable to update the database");
    } else {
        res.json('Update complete');
    }
}

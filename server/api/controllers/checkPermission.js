var MongooseRepository = require('../Repository/MongooseRepository');
var UserRepo = new MongooseRepository('users');


module.exports.verifyPermissions = async function (req, res, next) {
    let result = await UserRepo.findOne({_id: req.user._id});
    if (result.err) {
        return res.status(500).json({status: false, message: 'Not Allowed'});
    } else {
        if (result.data) {
            let user = result.data;
            let role = result.data.groups;
            let privilidge = result.data.permissions;
            return res.status(200).json({status: true, user});
        } else {
            res.status(500).send();
        }


    }

}

module.exports.requireGroup = function (req, res, next) {
    return function (req, res, next) {
        if (req.user && req.user.groups[0] === group) {
            next();
        } else {
            res.send(403);
        }
    }

}
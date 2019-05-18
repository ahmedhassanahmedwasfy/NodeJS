const securityUtility = require('./Security');
var MongooseRepository = require('../Repository/MongooseRepository');
var userRepo = new MongooseRepository('users');

module.exports.verifyToken = function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ').length === 2 && req.headers.authorization.split(' ')[0] == 'Bearer') {
        if (req.headers.authorization.split(' ')[1]) {
            let result = securityUtility.verifyToken(req.headers.authorization.split(' ')[1]);
            if (result) {
                req.user = result;
                next();
            } else {
                res.status(401).json({error: 'unauthorized'});
            }
        } else {
            res.status(401).json({error: 'unauthorized'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
};

module.exports.requirePermission = async function (permission, req, res, next) {
    let result = await userRepo.findOne({_id: req.user._id})
    if (result.err) {
        return res.status(500).send()
    } else {
        let user=result.data;
        let permissions_ids = user.groups.map(c => c.permissions);
        permissions_ids = permissions_ids.concat(user.permissions);
        let _permission = permissions_ids.filter(g => g == permission);
        if (_permission) {
            next();
        } else {
            res.status(403).send();
        }
    }
}


/*
module.exports.verifyGroup = function (req, res, next) {
    let result = securityUtility.requireGroup();
    if(result){
        req.user=result;
        next();
    }
    else{
        res.status(401).json({error: 'unauthorized'});
    }


};*/

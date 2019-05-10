const securityUtility = require('./Security');


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

module.exports.requireGroup = function (group, req, res, next) {
    let groups = req.user.groups;
    let _group = groups.filter(g => g._id == group);
    if (_group) {
        next();
    } else {
        res.status(403).send();
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

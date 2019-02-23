const securityUtility=require('./Security');
module.exports.verifyToken = function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ').length ===2  && req.headers.authorization.split(' ')[0] == 'Bearer') {
        if(req.headers.authorization.split(' ')[1]){
           let result= securityUtility.verifyToken(req.headers.authorization.split(' ')[1]);
           if(result){
               next();
           }
           else{
               res.status(401).json({error: 'unauthorized'});
           }
        }else{
            res.status(401).json({error: 'unauthorized'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}
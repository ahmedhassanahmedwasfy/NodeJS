const crypto = require('crypto');
const jwt = require('jsonwebtoken');
module.exports.validPassword = function (user, password) {
    var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    return user.hash === hash;
}

module.exports.generatetoken = function (user) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
}

module.exports.verifyToken = function (token) {
    return jwt.verify(token, "MY_SECRET");
}
//
// module.exports.verifyJWTToken = function (req, res, next) {
//     var token;
//     if(req){
//         if (req.headers && req.headers.authorization)
//             token = req.headers.authorization.split(' ')[1]
//
//         if (!token)
//             return res.status(403).send({ auth: false, message: 'No token provided.' });
//         else {
//             jwt.verify(token, "MY_SECRET",
//                 (err, decoded) => {
//                     if (err)
//                         return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
//                     else {
//                         req._id = decoded._id;
//                         console.log(req._id);
//                         next();
//                     }
//                 }
//             )
//         }
//
//     }
//
//     else {
//         console.log("sdfghgfdsa")
//     }
//
// }
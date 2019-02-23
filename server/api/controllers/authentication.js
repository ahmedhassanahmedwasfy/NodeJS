var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/users');
const crypto = require('crypto')
const securityUtility = require('../utilities/Security')
var MongooseRepository = require('../Repository/MongooseRepository');
var UserRepo = new MongooseRepository('users');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = async function (req, res) {


    let salt = crypto.randomBytes(16).toString('hex');
    let objs =
        [{
            name: req.body.name,
            email: req.body.email,
            salt: salt,
            hash: crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex'),
        }]
    let dbobject = await UserRepo.create(objs);

    if (dbobject.err) {
        sendJSONresponse(res, 500, {'error': 'err in saving user in mongo'});
    }
    var token;
    token = securityUtility.generatetoken(dbobject.data);
    sendJSONresponse(res, 200, {
        "token": token
    });


}; // = Authentication;
module.exports.login = async function (req, res) {

    let dbobject = await UserRepo.findOne({email: req.body.username});
    // , function (err, user) {
    if (dbobject.err) {
        return res.status(500).send(dbobject.err);
    }
    // Return if user not found in database
    if (!dbobject.data) {
        return res.status(401).send();
    }
    // Return if password is wrong
    if (!securityUtility.validPassword(dbobject.data, req.body.password)) {
        return res.status(401).send();
    }
    // If credentials are correct, return the user object
    let token = securityUtility.generatetoken(dbobject.data);
    res.status(200);
    res.json({
        "token": token
    });
    // });


}
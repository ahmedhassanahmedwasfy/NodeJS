var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/users');
const crypto = require('crypto')
const securityUtility = require('../utilities/Security')
var MongooseRepository = require('../Repository/MongooseRepository');
var UserRepo = new MongooseRepository('users');
var nodemailer = require('nodemailer');
var async = require('async');
const config = require('../config/config');


var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = async function (req, res) {
    let salt = crypto.randomBytes(16).toString('hex');
    let objs =
        [{
            name_EN: req.body.name_EN,
            name_AR: req.body.name_AR,
            email: req.body.email,
            salt: salt,
            hash: crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex'),
        }]
    let dbobject = await UserRepo.create(objs);

    if (dbobject.err) {
        sendJSONresponse(res, 500, {'error': 'err in saving user in mongo'});
    }
    var token;
    token = securityUtility.generatetoken(dbobject.data[0]);
    sendJSONresponse(res, 200, {
        "token": token
    });

};

module.exports.login = async function (req, res) {

    await User.findOne({email: req.body.email}).populate('groups').lean().exec(function (err, user) {
        if (err) {
            return res.status(500).send(dbobject.err);
        }
        if (!user) {
            return res.status(401).send();
        }
        if (!securityUtility.validPassword(user, req.body.password)) {
            return res.status(401).send();
        }
        let token = securityUtility.generatetoken(user);
        res.status(200);
        res.json({
            "token": token
        });
    })
};

module.exports.forgetPassword = function (req, res) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({email: req.body.email}, function (err, user) {
                if (!user) {
                    res.status(404).send("No account with that email address exists.");
                    console.log('No account with that email address exists.');
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTrans = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: config.development.email.auth.email,
                    pass: config.development.email.auth.pass
                }
            });
            var mailOptions = {

                to: user.email,
                from: config.development.email.auth.email,
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://localhost:4200/#/auth/reset-password/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'

            };

            smtpTrans.sendMail(mailOptions, function (err) {
                console.log('An e-mail has been sent to ' + user.email + ' with further instructions.');
                console.log('sent')
            });
        }
    ]), function (err) {
        console.log('this err' + ' ' + err)
    };
};

/*module.exports.resetPassword = async function (req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {

        if (!user) {
            console.log('Password reset token is invalid or has expired.');
        }
        else {
            console.log('user token' + user.token + 'success');
        }
    });
};*/

module.exports.saveNewPassword = async function (req, res) {
    async.waterfall([
            function (done) {
                User.findOne({
                    resetPasswordToken: req.params.token,
                    resetPasswordExpires: {$gt: Date.now()}
                }, function (err, user) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (!user) {
                        return res.status(401).send();
                        console.log('Password reset token is invalid or has expired.');
                    }

                    if (user) {
                        if (req.body.password === req.body.confirmPassword) {
                            let salt1 = crypto.randomBytes(16).toString('hex');
                            user.salt = salt1;
                            user.hash = crypto.pbkdf2Sync(req.body.password, salt1, 1000, 64, 'sha512').toString('hex');
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpires = undefined;
                            console.log('password' + user.password + 'and the user is' + user);
                            user.save(function (err) {
                                if (err) {
                                    return res.status(500).send(err);
                                } else {
                                    res.status(200);
                                    res.json({
                                        "token": user.resetPasswordToken
                                    });
                                }
                            });
                        }
                    } else {
                        console.log('Passwords do not match.');
                    }
                });
            },

        ],
    );
};




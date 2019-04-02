var mongoose = require('mongoose');
var User = require('../models/users');
const crypto = require('crypto')
var MongooseRepository = require('../Repository/MongooseRepository');
var userRepo = new MongooseRepository('users');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
/*const Joi = require('joi');
const schema = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
})*/

module.exports.index = function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            res.json({
                status: "Error",
                message: err
            });
        }

        res.json({
            status: "Success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

module.exports.new = async function (req, res) {
    let salt = crypto.randomBytes(16).toString('hex');

    let objs =
        [{
            name_EN: req.body.name_EN,
            name_AR: req.body.name_AR,
            email: req.body.email,
            permissions: req.body.permissions,
            groups: req.body.groups,
            salt: salt,
            hash: crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex')
}];
    let dbobject = await userRepo.create(objs);

    if (dbobject.err) {
        sendJSONresponse(res, 500, {'error': dbobject.err});
    }
    else  {
        return res.status(200).send(dbobject.data);
    }
};

module.exports.delete = async function (req, res) {
    await User.findOneAndDelete({_id: req.params.id}, function (err, user) {
        if (err) res.json(err);
        else res.json(user);
    });
};


module.exports.update = async function (req, res) {
    let o=req.body;
    if(req.body.password){
        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex')
        o.salt=salt;
        o.hash=hash;
    }
    let {error, result} = await userRepo.CreateOrUpdate(o)
    if (error) {
        res.status(500).send("unable to update the database");
    } else {
        res.json('Update complete');
    }

};

module.exports.view = async function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
};

// userSchema.methods.setPassword = function(password){
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
// };



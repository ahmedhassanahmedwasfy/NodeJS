var mongoose = require('mongoose');
var Permission = require('../models/permissions');
var MongooseRepository = require('../Repository/MongooseRepository');
var permissionRepo = new MongooseRepository('permissions');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
var ObjectId = mongoose.Types.ObjectId;
/*const Joi = require('joi');
const schema = Joi.object().keys({
    name_EN: Joi.string().alphanum().min(3).max(30).required(),
    name_AR: Joi.string().alphanum().min(3).max(30).required(),
})*/
exports.index = function (req, res, next) {
    Permission.find(function (err, permissions) {
        if (err) {
            res.json({
                status: "Error",
                message: err
            });
        }

        res.json({
            status: "Success",
            message: "Permissions retrieved successfully",
            data: permissions
        });
    });
};

/*module.exports.index = async function (req, res) {
    let dbobject = await permissionRepo.find({});

    if (dbobject.err) {
        return res.status(500).send(dbobject.err);
    }
    else  {
        return res.status(200).send();
    }

}*/

module.exports.new = async function (req, res) {
    let objs =
        [{
            name_EN: req.body.name_EN,
            name_AR: req.body.name_AR
        }];
    let dbobject = await permissionRepo.create(objs);

    if (dbobject.err) {
        sendJSONresponse(res, 500, {'error': dbobject.err});
    } else {
        return res.status(200).send(dbobject.data);
    }
}

module.exports.delete = async function (req, res) {
    await Permission.findOneAndDelete({_id: req.params.id}, function (err, permission) {
        if (err) res.json(err);
        else res.json(permission);
    });
}

module.exports.update = async function (req, res) {
    let {error, result} = await permissionRepo.CreateOrUpdate(req.body)
    if (error) {
        res.status(500).send("unable to update the database");
    } else {
        res.json('Update complete');
    }

}

module.exports.view = async function (req, res) {
    let id = req.params.id;
    Permission.findById(id, function (err, permission) {
        res.json(permission);
    });
}
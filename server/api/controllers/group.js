var mongoose = require('mongoose');
var Group = require('../models/groups');
var MongooseRepository = require('../Repository/MongooseRepository');
var groupRepo = new MongooseRepository('groups');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

exports.index = async function(req, res, next){
    await Group.find(function(err, groups){
        if(err){
            res.json({
                status: "Error",
                message: err
            });
        }

        res.json({
            status: "Success",
            message: "Groups retrieved successfully",
            data: groups
        });
    });
};

module.exports.new = async function (req, res) {
    let objs =
        [{
            name_EN: req.body.name_EN,
            name_AR: req.body.name_AR,
            permissions: req.body.permissions
        }];
    let dbobject = await groupRepo.create(objs);

    if (dbobject.err) {
        sendJSONresponse(res, 500, {'error': dbobject.err});
    }
    else  {
        return res.status(200).send(dbobject.data);
    }
}

module.exports.delete = async function (req, res) {
    await Group.findOneAndDelete({_id: req.params.id}, function (err, group) {
        if (err) res.json(err);
        else res.json(group);
    });
}

module.exports.update = async function (req, res) {
    let {error, result} = await groupRepo.CreateOrUpdate(req.body)
    if (error) {
        res.status(500).send("unable to update the database");
    } else {
        res.json('Update complete');
    }

}

module.exports.view = async function (req, res) {
    let id = req.params.id;
    Group.findById(id, function (err, group) {
        res.json(group);
    });
}

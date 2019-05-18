var mongoose = require('mongoose');
var multer = require('multer');
var MongooseRepository = require('../Repository/MongooseRepository');
var UserRepo = new MongooseRepository('users');
const GoogleDriveAPI = require('../utilities/GoogleDriveAPI')
const uuidv1 = require('uuid/v1');
const config = require('../config/config');

module.exports.userProfile = async function (req, res) {
    let result = await UserRepo.findOne({_id: req.user._id});
    if (result.err) {
        return res.status(500).json({status: false, message: 'User record not found.'});
    } else {
        if (result.data) {
            let user = result.data;
            return res.status(200).json({status: true, user});
        } else {
            res.status(500).send();
        }

    }
};

module.exports.editProfile = async function (req, res) {
    let dbObject = await UserRepo.update(req.body)
    if (dbObject.err) {
        res.status(500).send("unable to update the database");
    } else {
        res.json('Update complete');
    }
};

module.exports.uploadImage = async function (req, res) {
    let result = await UserRepo.findOne({_id: req.user._id});
    if (result.err) {
        res.status(500).send();
    } else {
        if (result.data) {
            var fileName = uuidv1();
            var folderId = config.development.googleDrive.UserProfileImagefolderId;
            var fileBody = req.file;
            GoogleDriveAPI.uploadImage(fileName, fileBody, folderId, async function (err, file) {
                if (err) {
                    res.status(500).send();
                } else {
                    result.data.image_Id = file.data.id;
                    let _dbObject = await UserRepo.CreateOrUpdate(result.data);
                    if (_dbObject.err) {
                        res.status(500).send();
                    } else {
                        console.log(file.data.id)
                        res.status(200).json(file.data.id);
                    }
                }
            })
        } else {
            res.status(500).send();
        }
    }
};

module.exports.getUserProfileImage = async function (req, res) {
    let result = await UserRepo.findOne({_id: req.user._id},['groups']);
    if (result.err) {
        res.status(500).send();
    } else {
        if (result.data) {
            var fileId = result.data.image_Id;
            if(fileId){
                var folderId = config.development.googleDrive.UserProfileImagefolderId;
                GoogleDriveAPI.getImage(fileId, async function (err, file) {
                    let bytes = [];
                    if (err) {
                        res.status(500).send();
                    } else {
                        file.data.on('end', () => {
                            var base64data = Buffer.concat(bytes ).toString('base64');
                            res.status(200).json(base64data);
                        }).on('data', function (data) {
                            bytes.push(data);
                        })
                            .on('error', err => {
                                res.status(500).send()
                            })
                    }
                })
            }else{
                res.status(200).send()
            }


        } else {
            res.status(500).send();
        }
    }

};


var mongoose = require('mongoose');
var User = require('../models/users');

module.exports.profileRead = function(req, res, next) {
  let id = req.payload._id;
  if (!id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    User.findById(id, function (err, user) {
      res.json(user);
    });
  }

};

require('dotenv').config();
const saltRounds = Number(process.env.SALT_ROUNDS);

var User = require('../models/user');
var bcrypt = require('bcrypt');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/porto-rest-api');

var get = function(req, res) {
  User.find({}, function (err, users) {
    res.send(users)
  });
}

var create = function(req, res) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new User({
    email: req.body.email,
    password: hash
  })
  newUser.save((err, user) => {
    if(err) {
      res.send(err.errors)
    } else res.send(user)
  })
}

var getOne = function(req, res) {
  User.find({_id: req.params.id}, (err, user) => {
    res.send(user)
  })
}

var update = function(req, res) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);
  User.findByIdAndUpdate(req.params.id, { $set: {
    email: req.body.email,
    password: hash
  } }, { runValidators: true }, (err, user) => {
    if(err) res.send(err.errors)
    res.send(user)
  })
}

var remove = function(req, res) {
  User.findOneAndRemove({_id: req.params.id}, (err, user) => {
    if(err) res.send(err)
    res.send(user)
  })
}

module.exports = {
  get, create, getOne, update, remove
};
var Memo = require('../models/memo');
var util = require('../helpers/util')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/porto-rest-api');

var get = function(req, res) {
  util.userInfo(req.headers.token, function(result) {
    Memo.find({ creator: result.id }, (err, memos) => {
      res.send(memos)
    })
  });
}

var create = function(req, res) {
  util.userInfo(req.headers.token, function(result) {
    var newMemo = new Memo({
      content: req.body.email,
      creator: result.id
    })
    newMemo.save((err, memo) => {
      if(err) {
        res.send(err.errors)
      } else res.send(memo)
    })
  })
}

var getOne = function(req, res) {
  Memo.find({_id: req.params.id}, (err, memo) => {
    res.send(memo)
  })
}

var update = function(req, res) {
  Memo.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true }, (err, memo) => {
    if(err) res.send(err.errors)
    res.send(memo)
  })
}

var remove = function(req, res) {
  Memo.findOneAndRemove({_id: req.params.id}, (err, memo) => {
    if(err) res.send(err)
    res.send(memo)
  })
}

module.exports = {
  get, create, getOne, update, remove
};
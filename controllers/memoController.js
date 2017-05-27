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
  var content = req.body.memo_content;
  util.userInfo(req.headers.token, function(result) {
    var newMemo = new Memo({
      content: content,
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
  util.userInfo(req.headers.token, function(result) {
    Memo.findById(req.params.id, (err, memo) => {
      if(err) {
        res.send(err)
      } else {
        if(memo.creator == result.id) {
          memo.content = req.body.memo_content;
          memo.save((err, newMemo) => {
            if(err) {
              res.send(err.errors)
            } else res.send(newMemo)
          })
        } else {
          res.send('This is not your memo')
        }
      }
    })
  })
}

var remove = function(req, res) {
  util.userInfo(req.headers.token, function(result) {
    Memo.findById(req.params.id, (err, memo) => {
      if(err) {
        res.send(err)
      } else {
        if(memo.creator == result.id) {
          Memo.remove({_id: req.params.id}, (err) => {
            if(err) {
              res.send(err)
            } else res.send('Removed')
          })
        } else {
          res.send('This is not your memo')
        }
      }
    })
  })
}

module.exports = {
  get, create, getOne, update, remove
};
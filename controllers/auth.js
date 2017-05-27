require('dotenv').config();
const sec = process.env.TOKEN_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);

var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/porto-rest-api');

var login = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  let token = req.headers.token;

  if(!token) {
    User.findOne({ email: email }, function(err, user) {
      if(err) res.send(err);
      if(user) {
        bcrypt.compare(password, user.password)
        .then(result => {
          if(result) {
            var token = jwt.sign({id: user.id, email: user.email }, sec);
            res.send(token);
          } else {
            res.send('Incorrect password');
          }
        })
        .catch(err => console.log(err))
      } else res.send('No such user')
    })
  } else {
    res.send('You already have a token!')
  }
}

var signup = function(req, res, next) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);
  let token = req.headers.token;

  var newUser = new User({
    email: req.body.email,
    password: hash
  })

  if(!token) {
    newUser.save((err, user) => {
      if(err) {
        res.send(err.errors)
      } else res.send(user)
    })
  } else {
    res.send('You already have a token')
  }
}

var authUser = function(req, res, next) {
  let token = req.headers.token

  if(token) {
    jwt.verify(token, sec, (err, decoded) => {
      if(decoded.id == req.params.id) {
        next()
      } else {
        res.send('Route only for authorized user only')
      }
    })
  } else {
    res.send('Not logged in')
  }
}

var allUser = function(req, res, next) {
  let token = req.headers.token

  if(token) {
    jwt.verify(token, sec, (err, decoded) => {
      if(decoded) {
        next()
      } else {
        res.send('Route only for authorized user only')
      }
    })
  } else {
    res.send('Not logged in')
  }
}

module.exports = {
  login, signup, authUser, allUser
};

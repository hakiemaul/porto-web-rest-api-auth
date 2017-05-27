require('dotenv').config();
const sec = process.env.TOKEN_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);

var Company = require('../models/company');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/compalink');

var login = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  let token = req.headers.token;

  if(!token) {
    Company.findOne({ email: email }, function(err, company) {
      if(err) res.send(err);
      bcrypt.compare(password, company.password)
      .then(result => {
        if(result) {
          var token = jwt.sign({id: company.id, name: company.name, role: company.role }, sec);
          res.send(token);
        } else {
          res.send('Password salah');
        }
      })
      .catch(err => console.log(err))
    })
  } else {
    res.send('You already have a token!')
  }
}

var signup = function(req, res, next) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);
  let token = req.headers.token;

  var newCompany = new Company({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    employee: req.body.employee,
    role: 'user'
  })

  if(!token) {
    newCompany.save((err, company) => {
      if(err) {
        res.send(err.errors)
      } else res.send(company)
    })
  } else {
    res.send('You already have a token')
  }
}

var adminOnly = function(req, res, next) {
  let token = req.headers.token

  if(token) {
    jwt.verify(token, sec, (err, decoded) => {
      if(decoded.role == 'admin') {
        next()
      } else {
        res.send('Route only for admin')
      }
    })
  } else {
    res.send('Not logged in')
  }
}

var authAndAdmin = function(req, res, next) {
  let token = req.headers.token

  if(token) {
    jwt.verify(token, sec, (err, decoded) => {
      if(decoded.id == req.params.id || decoded.role == 'admin') {
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
  login, signup, adminOnly, authAndAdmin, allUser
};

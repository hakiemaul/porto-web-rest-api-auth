require('dotenv').config();
const sec = process.env.TOKEN_SECRET;

var jwt = require('jsonwebtoken');

var userInfo = function(token, callback) {
  if(token) {
    jwt.verify(token, sec, (err, decoded) => {
      if(decoded) {
        callback(decoded)
      } else {
        return 'No info'
      }
    })
  } else {
    return 'No token'
  }
}

module.exports = {
  userInfo
};
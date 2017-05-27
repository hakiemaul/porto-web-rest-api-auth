var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator = require('validator');

var userSchema = new Schema ({
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    validate: {
      validator: function(v) {
        return validator.isEmail(v)
      },
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: [true, 'Please enter fill your password.']
  }
})

var User = mongoose.model('User', userSchema);

module.exports = User;
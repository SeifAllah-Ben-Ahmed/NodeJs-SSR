const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: [true, 'Email should be unique'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid your email!'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on .save() .create()
      validator: function (val) {
        return val === this.password;
      },
      message: 'The password and the password confirm are not the same!',
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

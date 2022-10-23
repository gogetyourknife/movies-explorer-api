const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const {
  WRONG_EMAIL,
} = require('../utils/errors/error-names');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);

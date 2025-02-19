const mongoose = require('mongoose');
const { validateEmail, validateMinLength, validateBirthDate } = require('../utils/ValidateModel');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password) => validateMinLength(password, 8),
      message: `Password should be more than 8 characters.`
    }
  },
  email: {
    type: String,
    required: true,
    validate: [
      {
        validator: validateEmail,
        message: props => `${props.value} is not a valid email address!`
      },
    ]
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (phone) => validateMinLength(phone, 10) && phone.length === 10,
      message: `Phone should be exactly 10 characters.`
    },
    unique: true
  },
  birthDate: {
    type: String,
    required: true,
    validate: {
      validator: (birthDate) => validateBirthDate(birthDate),
      message: `Birth date should be in the past.`
    }
  },
  avatar: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
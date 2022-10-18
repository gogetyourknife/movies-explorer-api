const mongoose = require('mongoose');
const regex = require('../utils/regex');

const { ObjectId } = mongoose.Schema;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => RegExp(regex).test(v),
      message: 'Некорретный адрес ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => RegExp(regex).test(v),
      message: 'Некорретный адрес ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => RegExp(regex).test(v),
      message: 'Некорретный адрес ссылки',
    },
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
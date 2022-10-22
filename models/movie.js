const mongoose = require('mongoose');
// const { regex } = require('../utils/regex');

const isURL = require('validator/lib/isURL');

const {
  WRONG_LINK,
  MOVIE_SCHEMA_ERROR_HANDLER,
} = require('../utils/errors/error-names');

const { ObjectId } = mongoose.Schema;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.COUNTRY],
  },
  director: {
    type: String,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.DURATION],
  },
  year: {
    type: String,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.YEAR],
  },
  description: {
    type: String,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.DESCRIPTION],
  },
  image: {
    type: String,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.IMAGE],
    validate: {
      validator: (v) => isURL(v),
      message: WRONG_LINK,
    },
  },
  trailerLink: {
    type: String,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.TRAILER_LINK],
    validate: {
      validator: (v) => isURL(v),
      message: WRONG_LINK,
    },
  },
  thumbnail: {
    type: String,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.THUMBNAIL],
    validate: {
      validator: (v) => isURL(v),
      message: WRONG_LINK,
    },
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.MOVIE_ID],
  },
  nameRU: {
    type: String,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.NAME_RU],
  },
  nameEN: {
    type: String,
    required: [true, MOVIE_SCHEMA_ERROR_HANDLER.NAME_EN],
  },
});

module.exports = mongoose.model('movie', movieSchema);

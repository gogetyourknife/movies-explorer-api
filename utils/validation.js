const { celebrate, Joi } = require('celebrate');
const regex = require('./regex');

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userSchemaValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const profileSchemaValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const movieSchemaValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(regex)),
    trailerLink: Joi.string().required().pattern(new RegExp(regex)),
    thumbnail: Joi.string().required().pattern(new RegExp(regex)),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieDeleteSchemaValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  loginValidate,
  userSchemaValidate,
  profileSchemaValidate,
  movieSchemaValidate,
  movieDeleteSchemaValidate,
};

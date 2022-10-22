const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');

const {
  MOVIE_SCHEMA_ERROR_HANDLER,
} = require('./errors/error-names');

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
    country: Joi.string().required().messages({
      'string.required': MOVIE_SCHEMA_ERROR_HANDLER.COUNTRY,
    }),
    director: Joi.string().required().messages({
      'string.required': MOVIE_SCHEMA_ERROR_HANDLER.DIRECTOR,
    }),
    duration: Joi.number().required().messages({
      'string.required': MOVIE_SCHEMA_ERROR_HANDLER.DURATION,
    }),
    year: Joi.string().required().messages({
      'string.required': MOVIE_SCHEMA_ERROR_HANDLER.YEAR,
    }),
    description: Joi.string().required().messages({
      'string.required': MOVIE_SCHEMA_ERROR_HANDLER.DESCRIPTION,
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(MOVIE_SCHEMA_ERROR_HANDLER.IMAGE);
    })
      .messages({
        'string.required': MOVIE_SCHEMA_ERROR_HANDLER.ERROR_URL,
      }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(MOVIE_SCHEMA_ERROR_HANDLER.TRAILER_LINK);
    })
      .messages({
        'string.required': MOVIE_SCHEMA_ERROR_HANDLER.ERROR_URL,
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(MOVIE_SCHEMA_ERROR_HANDLER.THUMBNAIL);
    })
      .messages({
        'string.required': MOVIE_SCHEMA_ERROR_HANDLER.ERROR_URL,
      }),
    movieId: Joi.number().required().messages({
      'string.required': MOVIE_SCHEMA_ERROR_HANDLER.MOVIE_ID,
    }),
    nameRU: Joi.string().required().messages({
      'string.required': MOVIE_SCHEMA_ERROR_HANDLER.NAME_RU,
    }),
    nameEN: Joi.string().required().messages({
      'string.required': MOVIE_SCHEMA_ERROR_HANDLER.NAME_EN,
    }),
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

const Movie = require('../models/movie');

const BadRequestError = require('../utils/errors/bad-request-400');
const ForbiddenError = require('../utils/errors/forbidden-403');
const NotFoundError = require('../utils/errors/not-found-404');

const {
  BAD_REQUEST,
  NOT_FOUND_FILM,
  ACCESS_ERROR_FILM,
} = require('../utils/errors/error-names');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: req.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_FILM);
      }
      if (owner !== movie.owner.toString()) {
        throw new ForbiddenError(ACCESS_ERROR_FILM);
      } else {
        return Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

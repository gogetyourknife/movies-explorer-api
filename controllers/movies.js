const Movie = require('../models/movie');

const BadRequestError = require('../utils/errors/bad-request-400');
const ForbiddenError = require('../utils/errors/forbidden-403');
const NotFoundError = require('../utils/errors/not-found-404');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      res.send(movie);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
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
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректный запрос'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (owner !== movie.owner.toString()) {
        throw new ForbiddenError('У вас нет прав на удаление фильма');
      } else {
        return Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный запрос'));
      } else {
        next(err);
      }
    });
};
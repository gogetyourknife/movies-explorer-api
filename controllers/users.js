const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../utils/errors/bad-request-400');
const UnauthorizedError = require('../utils/errors/unauthorized-401');
const NotFoundError = require('../utils/errors/not-found-404');
const ConflictError = require('../utils/errors/conflict-409');

const {
  BAD_REQUEST,
  WRONG_DATA_USER,
  NOT_FOUND_USER,
  CONFLICT_ERROR,
  ERROR_CODE_DUPLICATE,
  ALREADY_EXISTS_EMAIL,
} = require('../utils/errors/error-names');

const devJWT = 'some-secret-key';

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(WRONG_DATA_USER);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(WRONG_DATA_USER);
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : devJWT,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER);
      } else {
        res.send(user);
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

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.code === ERROR_CODE_DUPLICATE) {
        next(new ConflictError(CONFLICT_ERROR));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(userId, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      } else if (err.code === ERROR_CODE_DUPLICATE) {
        next(new ConflictError(ALREADY_EXISTS_EMAIL));
      } else {
        next(err);
      }
    });
};

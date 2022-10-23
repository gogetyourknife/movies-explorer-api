const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const { loginValidate, userSchemaValidate } = require('../utils/validation');
const {
  login,
  createUser,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/not-found-404');
const {
  NOT_FOUND_LINK,
} = require('../utils/errors/error-names');

router.post('/signin', loginValidate, login);
router.post('/signup', userSchemaValidate, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_LINK));
});

module.exports = router;

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

router.post('/signin', loginValidate, login);
router.post('/signup', userSchemaValidate, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
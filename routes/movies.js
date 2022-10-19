const router = require('express').Router();
const { movieSchemaValidate, movieDeleteSchemaValidate } = require('../utils/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', movieSchemaValidate, createMovie);
router.delete('/:movieId', movieDeleteSchemaValidate, deleteMovie);

module.exports = router;
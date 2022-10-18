const router = require('express').Router();
const { movieSchemaValidate, movieDeleteSchemaValidate } = require('../utils/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', movieSchemaValidate, createMovie);
router.delete('/movies/_id', movieDeleteSchemaValidate, deleteMovie);

module.exports = router;
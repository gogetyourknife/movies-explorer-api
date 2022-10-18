const router = require('express').Router();
const { profileSchemaValidate } = require('../utils/validation');

const {
  getUser,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', profileSchemaValidate, updateProfile);

module.exports = router;
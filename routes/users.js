const router = require('express').Router();
const { profileSchemaValidate } = require('../utils/validation');

const {
  getUser,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', profileSchemaValidate, updateProfile);

module.exports = router;

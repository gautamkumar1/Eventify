const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated,logout);

module.exports = router
const express = require('express');
const { register, login, logout, verifyGoogleToken } = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/AuthMiddleware');
const validate = require('../middlewares/validate-middleware');
const { signupSchema, loginSchema } = require('../validators/auth-validator');
const router = express.Router();

router.post('/register', validate(signupSchema),register);
router.post('/login', validate(loginSchema),login);
router.post('/google', verifyGoogleToken);
router.get('/logout', isAuthenticated,logout);

module.exports = router
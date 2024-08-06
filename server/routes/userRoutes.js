const express = require('express');
const { register, login, getAllUsersData, logout } = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated,logout);
router.get('/getallusers', getAllUsersData);
module.exports = router
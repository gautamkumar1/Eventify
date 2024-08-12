const express = require('express');
const passport = require('passport');
const generateToken = require('../utils/jwt');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  const token = generateToken(req.user);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('http://localhost:5173/events');
});

module.exports = router;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ where: { googleId: profile.id } });
    if (!user) {
      user = await User.create({ googleId: profile.id, username: profile.displayName, email: profile.emails[0].value });
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ where: { facebookId: profile.id } });
    if (!user) {
      user = await User.create({ facebookId: profile.id, username: profile.displayName, email: profile.emails[0].value });
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

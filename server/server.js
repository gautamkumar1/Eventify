require('dotenv').config();

const express = require('express');
const sequelize = require('./database/Db');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const session = require("express-session");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
// const oauthRoutes = require('./routes/oauthRoutes');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const socialAuthRoute = require('./routes/userRoutes')
const bcrypt = require('bcryptjs')
const { initSocket } = require('./socket/socket');
const http = require('http');

require('./oAuth-Passport/passport');

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:5173",
  // origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
// setup session
app.use(session({
  secret:process.env.SESSION_SECRET_KEY,
  resave:false,
  saveUninitialized:true
}))
// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new OAuth2Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope:["profile","email"]
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ where: { googleId: profile.id } });
    if (!user) {
      user = await User.create({ googleId: profile.id, username: profile.displayName, email: profile.emails[0].value,password: await bcrypt.hash(
        require("crypto").randomBytes(12).toString("hex"),
        10
            ), });
    }
    const payload = { id: user.id, email: user.email };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1d',
        })
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));
// passport-jwt
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
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

app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Hello from server');
})

// initial google ouath login
app.get(
  '/book-ticket',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: `Welcome ${req.user.name}` });
  }
);
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Generate a JWT using the authenticated user's information
    const payload = { id: req.user.id, email: req.user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log("Google Login Token: " + token)
    // Set the JWT as a cookie
    // res.cookie('token', token, { httpOnly: true });

    // Redirect to the desired page after successful authentication
    res.redirect(`http://localhost:5173/userdashboard?token=${token}&Is_socialLogin=true`);
  }
);


// User Routes
app.use('/api/user', userRoutes);
// Google and Facebook routes
// app.use('/auth/oauth', oauthRoutes);
// Event Routes
app.use('/api/events', eventRoutes);
// Tickets and Booking Routes
app.use('/api/ticket', ticketRoutes);
app.use('/api/auth',socialAuthRoute)
// Socket.io connection - Real-time ticket availability updates

initSocket(server);
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});


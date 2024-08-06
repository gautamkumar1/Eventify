require('dotenv').config();

const express = require('express');
const sequelize = require('./database/Db');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const oauthRoutes = require('./routes/oauthRoutes');
require('./oAuth-Passport/passport');

const app = express();
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
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Hello from server');
})
app.use('/api/user', userRoutes);
app.use('/auth/oauth', oauthRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

require('dotenv').config();

const express = require('express');
const sequelize = require('./database/Db');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const oauthRoutes = require('./routes/oauthRoutes');
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const { initSocket } = require('./socket/socket');
const nodemailer = require('nodemailer');
const cors = require('cors')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Hello from server');
})
// Handel Send 
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_KEY; // replace with your webhook secret

  let event;

  try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log(`���️  Webhook event received: ${event.type}`);
  } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log("Hello>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      
      // Send an email using Nodemailer
      const transporter = nodemailer.createTransport({
          service: 'Gmail', // or any email service you're using
          auth: {
              user:process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          },
      });

      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: session.customer_email,
          subject: 'Payment Successful',
          text: `Thank you for your payment for ${session.metadata.eventname}!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Email sent: ' + info.response);
      });
  }

  res.status(200).json({ received: true });
});

// Endpoint for starting the payment session
app.post('/create-checkout-session', async (req, res) => {
  const { bookData } = req.body;

  if (bookData.price < 42) {
      return res.status(400).json({ error: "The minimum amount must be ₹42 or more." });
  }

  const lineItems = [{
      price_data: {
          currency: "inr",
          product_data: {
              name: bookData.eventname,
              metadata: {
                  ticketId: bookData.ticketId,
                  fullname: bookData.fullname,
                  email: bookData.email,
                  ticketType: bookData.ticketType,
              },
          },
          unit_amount: bookData.price * 100,
      },
      quantity: bookData.quantity,
  }];

  const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/failed",
      customer_email: bookData.email,
      metadata: {
          eventname: bookData.eventname,
      },
  });

  res.json({ id: session.id });
});


// User Routes
app.use('/api/user', userRoutes);
// Google and Facebook routes
app.use('/auth/oauth', oauthRoutes);
// Event Routes
app.use('/api/events', eventRoutes);
// Tickets and Booking Routes
app.use('/api/ticket', ticketRoutes);

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



module.exports = {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    emailConfig: {
      service: 'Gmail', // or any other email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
  };
  
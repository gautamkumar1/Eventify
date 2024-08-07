const Stripe = require('stripe');
const nodemailer = require('nodemailer');
const { stripeSecretKey, emailConfig } = require('../config/config');
const Booking = require('../models/Booking');

const stripe = new Stripe(stripeSecretKey);

exports.createPaymentIntent = async (req, res) => {
    const { amount, currency } = req.body;
    //   here we creating a payment intent
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        });
        res.status(200).send({
            message: "Payment intent created successfully",
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: 'Payment initiation failed' });
    }
};

// exports.handlePayment = async (req, res) => {
//     const { paymentIntentId, bookingDetails } = req.body; // Input: It takes paymentIntentId and bookingDetails from req.body.
//     try {
//         const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId); // It retrieves the payment intent using Stripe's API.
//         if (paymentIntent.status === 'succeeded') {
//             const booking = await Booking.create(bookingDetails);

//             // Send confirmation email
//             const transporter = nodemailer.createTransport(emailConfig);
//             const mailOptions = {
//                 from: emailConfig.auth.user,
//                 to: booking.email,
//                 subject: 'Booking Confirmation',
//                 text: `Thank you for your booking, ${booking.fullname}. Your booking is confirmed.`,
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.error('Error sending confirmation email:', error);
//                 } else {
//                     console.log('Email sent: ' + info.response);
//                 }
//             });

//             res.status(200).send({ message: 'Payment successful and booking confirmed', booking });
//         } else {
//             res.status(400).send({ error: 'Payment not successful' });
//         }
//     } catch (error) {
//         console.error('Error handling payment:', error);
//         res.status(500).send({ error: 'Payment handling failed' });
//     }
// };


exports.handlePayment = async (req, res) => {
    const { paymentIntentId, bookingDetails } = req.body;
    try {
        // Retrieve the payment intent using the ID
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        console.log('Received paymentIntentId:', paymentIntentId);
            console.log('Retrieved paymentIntent:', paymentIntent);
            console.log("status: ",paymentIntent.status)
        if (paymentIntent.status === 'succeeded') {
            // Create the booking
            

            const booking = await Booking.create(bookingDetails);

            // Send confirmation email
            const transporter = nodemailer.createTransport(emailConfig);
            const mailOptions = {
                from: emailConfig.auth.user,
                to: booking.email,
                subject: 'Booking Confirmation',
                text: `Thank you for your booking, ${booking.fullname}. Your booking is confirmed.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending confirmation email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.status(200).send({ message: 'Payment successful and booking confirmed', booking });
        } else {
            res.status(400).send({ error: 'Payment not successful' });
        }
    } catch (error) {
        console.error('Error handling payment:', error);
        res.status(500).send({ error: 'Payment handling failed' });
    }
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");

const PaymentController = async (req, res, next) => {
    try {
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
                unit_amount: bookData.price * 100, // Convert INR to the smallest currency unit (paise)
            },
            quantity: bookData.quantity,
        }];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/failed",
        });

        res.json({ id: session.id });

    } catch (error) {
        console.log(error);
    }
};

const sendPaymentInvoices = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_KEY // replace with your webhook secret

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Send an email using Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or any email service you're using
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: session.customer_email, // This is the email provided during the Stripe checkout
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
}

module.exports = PaymentController;
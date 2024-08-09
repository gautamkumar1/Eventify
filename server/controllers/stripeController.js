const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const PaymentController = async (req, res, next) => {
//     try {
//         const { bookData } = req.body;
//         console.log(bookData);
        
//         const lineItems = bookData.map((bookTicketData) => ({
//             price_data: {
//                 currency: "inr",
//                 ticketingBookingData: {
//                     ticketId: bookTicketData.ticketId,
//                     fullname: bookTicketData.fullname,
//                     email: bookTicketData.email,
//                     eventname: bookTicketData.eventname,
//                     ticketType: bookTicketData.ticketType,
                    
//                 },
//                 unit_amount: bookTicketData.price * 100,
//             },
//             quantity: bookTicketData.quantity
//         }));

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: "http://localhost:5173/success",
//             cancel_url: "http://localhost:5173/failed",
//         });

//         res.json({ id: session.id })

//     } catch (error) {
//         console.log(error);

//     }
// }
const PaymentController = async (req, res, next) => {
    try {
        const { bookData } = req.body;
        // console.log(bookData.ticketId);
        const lineItems = [{
            price_data: {
                currency: "inr",
                ticketingBookingData: {
                    ticketId: bookData.ticketId,
                    fullname: bookData.fullname,
                    email: bookData.email,
                    eventname: bookData.eventname,
                    ticketType: bookData.ticketType,
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
        });

        res.json({ id: session.id });

    } catch (error) {
        console.log(error);
    }
};

module.exports = PaymentController;
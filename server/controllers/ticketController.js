const Ticket = require('../models/Ticket');
const Booking = require('../models/Booking');
const { getIo } = require('../socket/socket');
const { Op, UUIDV4 } = require('sequelize');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createTicketType = async (req, res) => {
    try {
        const { eventname, type, price, available } = req.body;
        if (!eventname || !type || !price || !available) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const ticket = await Ticket.create({ eventname, type, price, available });
        res.status(201).json({ message: "Ticket created successfully", ticket });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Ticket creation failed", error });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll();
        res.status(200).json({
            message: 'All Tickets fetched successfully',
            data: tickets
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'All Tickets fetched failed' });
    }
};


exports.getTicketById = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json({
            message: 'Ticket found successfully',
            ticket: ticket
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Ticket found failed' });
    }
};

exports.deleteTicket = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        await ticket.destroy();
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Ticket deleted failed' });
    }
};

exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    const { type, price, available } = req.body;

    try {
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        ticket.type = type;
        ticket.price = price;
        ticket.available = available;
        await ticket.save();

        // Emit real-time update to clients
        getIo().emit('ticketUpdate', { ticketId: ticket.id, available: ticket.available });

        res.status(200).json({ message: 'Ticket updated successfully', ticket });
    } catch (error) {
        console.log(error);

        res.status(400).json({ message: 'Ticket updated failed' });
    }
};

exports.getBookedTickets = async (req, res) => {
    try {
        const bookedTickets = await Booking.findAll();
        res.status(200).json({
            message: 'All Booked Tickets fetched successfully',
            data: bookedTickets
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'All Booked Tickets fetched failed' });
    }
};
exports.bookTicket = async (req, res) => {
    const { quantity, price, fullname, ticketType, event, email, token } = req.body;

    if (!quantity || !price || !fullname || !ticketType || !event || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({
            amount: price * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email
        }
        )
        if (payment) {
            const ticket = await Ticket.findOne({
                where: {
                    available: {
                        [Op.gte]: quantity // Ensure there are enough tickets available
                    },
                    eventname: event
                }
            });
            if (!ticket) {
                return res.status(400).json({ message: 'No suitable tickets available' });
            }

            ticket.available -= quantity;
            await ticket.save();
            // Create a new booking record with 'pending' payment status
            const booking = await Booking.create({
                ticketId: ticket.id, // Use the found ticket ID
                fullname,
                email,
                event,
                ticketType,
                quantity,
                price,
                userId: req.user.id, // Assuming req.user.id is available for the authenticated user
                paymentStatus: 'pending', // Set initial payment status to 'pending'
            });

            getIo().emit('ticketUpdate', { ticketId: ticket.id, available: ticket.available });

        }
        res.send("Payment Successful")

    } catch (error) {
        console.log(error);
        
    }

    // try {
    //     // Find a ticket based on availability and event
    //     const ticket = await Ticket.findOne({
    //         where: {
    //             available: {
    //                 [Op.gte]: quantity // Ensure there are enough tickets available
    //             },
    //             eventname: event 
    //         }
    //     });

    //     if (!ticket) {
    //         return res.status(400).json({ message: 'No suitable tickets available' });
    //     }

    //     ticket.available -= quantity;
    //     await ticket.save();
    //     // Create a new booking record with 'pending' payment status
    //     const booking = await Booking.create({
    //         ticketId: ticket.id, // Use the found ticket ID
    //         fullname,
    //         email,
    //         event,
    //         ticketType,
    //         quantity,
    //         price,
    //         userId: req.user.id, // Assuming req.user.id is available for the authenticated user
    //         paymentStatus: 'pending', // Set initial payment status to 'pending'
    //     });

    //     // Create a Stripe checkout session
    //     const session = await stripe.checkout.sessions.create({
    //         payment_method_types: ['card'],
    //         line_items: [
    //             {
    //                 price_data: {
    //                     currency: 'usd',
    //                     product_data: {
    //                         name: `${event} - ${ticketType}`, // Ticket description
    //                     },
    //                     unit_amount: price * 100, // Amount in cents
    //                 },
    //                 quantity: quantity,
    //             },
    //         ],
    //         mode: 'payment',
    //         success_url: 'https://your-site.com/success', // Replace with your actual success URL
    //         cancel_url: 'https://your-site.com/cancel', // Replace with your actual cancel URL
    //         metadata: {
    //             bookingId: booking.id, // Pass the booking ID to Stripe
    //         },
    //     });

    //     // Send success response with the Stripe session ID
    //     res.status(200).json({
    //         message: 'Ticket booked successfully, complete the payment',
    //         sessionId: session.id, // Return the Stripe session ID
    //         booking,
    //     });

    //     // Emit real-time update to clients
    //     getIo().emit('ticketUpdate', { ticketId: ticket.id, available: ticket.available });

    // } catch (error) {
    //     console.error('Error booking ticket:', error);
    //     res.status(500).json({ message: 'Ticket booking failed' });
    // }
};
const Ticket = require('../models/Ticket');
const Booking = require('../models/Booking');

exports.createTicketType = async (req, res) => {
    const { type, price, available } = req.body;
    if (!type ||!price ||!available) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const ticket = await Ticket.create({ type, price, available });
        res.status(201).json({message: 'Ticket created successfully',
            ticket: ticket
        })
    } catch (error) {
        console.log(error);
        
        res.status(400).json({message: 'Ticket created failed'});
    }
};

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll();
        res.status(200).json({message: 'All Tickets fetched successfully',
            data:tickets
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'All Tickets fetched failed'});
    }
};

exports.bookTicket = async (req, res) => {
    const { ticketId, quantity,price } = req.body;
    if (!ticketId ||!quantity || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const ticket = await Ticket.findByPk(ticketId);

        if (!ticket || ticket.available < quantity) {
            return res.status(400).json({ message: 'Not enough tickets available' });
        }

        ticket.available -= quantity;
        await ticket.save();

        const newBookingCreated = await Booking.create({
            userId: req.user.id,
            ticketId: ticket.id,
            quantity,
            price
        });

        res.status(200).json({ message: 'Ticket booked successfully',
            newBookingTicketsAvailable: newBookingCreated
         });

        // real-time update to clients
        io.emit('ticketUpdate', { ticketId: ticket.id, available: ticket.available });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Ticket booked failed'});
    }
};

const Ticket = require('../models/Ticket');
const Booking = require('../models/Booking');
const { getIo } = require('../socket/socket');

exports.createTicketType = async (req, res) => {
    try {
        const { eventname,type, price, available } = req.body;
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
        res.status(200).json({message: 'All Tickets fetched successfully',
            data:tickets
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'All Tickets fetched failed'});
    }
};

exports.bookTicket = async (req, res) => {
    const { ticketId, quantity,price,fullname,paymentStatus,ticketType,event,email } = req.body;
    if (!ticketId ||!quantity || !price || !fullname || !paymentStatus || !ticketType || !event || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const ticket = await Ticket.findByPk(ticketId);
        const debug = !ticket || ticket.available < quantity
        console.log("Debug", debug);
        
        if (!ticket || ticket.available < quantity) {
            return res.status(400).json({ message: 'Not enough tickets available' });
        }

        ticket.available -= quantity;
        await ticket.save();

        const BookedTicketCreated = await Booking.create({
            userId: req.user.id,
            ticketId: ticket.id,
            quantity,
            price,
            fullname,
            paymentStatus,
            ticketType,
            event,
            email
        });

        res.status(200).json({ message: 'Ticket booked successfully',
            Book_Ticket: BookedTicketCreated
         });

        // real-time update to clients
        getIo().emit('ticketUpdate', { ticketId: ticket.id, available: ticket.available });


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Ticket booked failed'});
    }
};

exports.getTicketById = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json({ message: 'Ticket found successfully' ,
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
const express = require('express');
const { isAuthenticated,isAuthorized } = require('../middlewares/AuthMiddleware');
const { bookTicket, getTickets, createTicketType, getTicketById, updateTicket, deleteTicket } = require('../controllers/ticketController');
const router = express.Router();


router.post('/create-tickets', isAuthenticated, isAuthorized(), createTicketType);
router.post('/book-tickets', isAuthenticated, bookTicket);
router.get('/get-tickets', isAuthenticated,getTickets);
router.get('/getbyid-tickets/:id', isAuthenticated,getTicketById);
router.put('/update-tickets/:id', isAuthenticated,isAuthorized(),updateTicket)
router.delete('/delete-tickets/:id',isAuthenticated,isAuthorized(),deleteTicket)


module.exports = router;

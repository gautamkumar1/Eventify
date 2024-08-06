const express = require('express');
const { isAuthenticated,isAuthorized } = require('../middlewares/AuthMiddleware');
const { bookTicket, getTickets, createTicketType } = require('../controllers/ticketController');
const router = express.Router();


router.post('/create-tickets', isAuthenticated, isAuthorized(), createTicketType);
router.post('/book-tickets', isAuthenticated, bookTicket);
router.get('/get-tickets', isAuthenticated,getTickets);


module.exports = router;

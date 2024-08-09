const express = require('express');
const PaymentController = require('../controllers/stripeController');
const router = express.Router();

router.post('/create-checkout-session', PaymentController);


module.exports = router;

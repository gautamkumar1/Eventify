const express = require('express');
const { createPaymentIntent, handlePayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/handle-payment', handlePayment);

module.exports = router;

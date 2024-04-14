import express from 'express';
import { getPaymentController, makePaymentController } from '../controllers/paymentController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

//get payment gateway token
router.get('/payment-token', getPaymentController);

//make payment
router.post('/payment', requireSignIn, makePaymentController);

export default router;
import express from 'express';
import { registerController, loginController } from '../controllers/authController.js';

const router = express.Router();

// For signup --> POST method
router.post('/register', registerController);

// For login --> POST method
router.post('/login', loginController);

export default router;
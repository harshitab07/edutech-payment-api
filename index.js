import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import paymentRoutes from './routes/paymentRoute.js';

// rest obj
const app = express();

// config env
dotenv.config();

// config db
connectDb();

// middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1>APIs Running</h1>`)
} );

// 1. For login / signup
app.use('/api/v1/auth', authRoutes);
const port = process.env.PORT || 8080;

// 2. Make payment
app.use('/api/v1/payment', paymentRoutes);

app.listen(port, () => {
    console.log(`Server running at port ${port}.`);
})
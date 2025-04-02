import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler';
import userRoutes from './routes/userRoutes'
import artistRoutes from './routes/artistRoutes'
import bookingRoutes from './routes/bookingRoutes'
import eventRoutes from './routes/eventRoutes'
import compression from "compression"
import rateLimit from "express-rate-limit"
import mongoose from 'mongoose';



const app: Application = express();

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per IP per 15 min
    message: "Too many requests, please try again later.",
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));


app.use('/user', userRoutes)
app.use('/artist', artistRoutes)
app.use('/booking', bookingRoutes)


// Error handler
app.use(errorHandler);

export default app;





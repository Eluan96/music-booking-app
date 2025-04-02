
import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URL || 'mongodb+srv://eluan:qwertyuiop@music-booking-app.0igrrrn.mongodb.net/',
  jwtSecret: process.env.JWT_SECRET || 'onGod',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  environment: process.env.NODE_ENV || 'development'
};
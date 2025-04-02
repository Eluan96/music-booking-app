import mongoose from 'mongoose';
import env from './config';
import logger from '../utils/logger';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
import mongoose from 'mongoose';
import app from './app';
import config from './config/config';
import connectDB from './config/db';
import logger from './utils/logger';

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
   const server = app.listen(config.port, () => {
      logger.info(`Server running in ${config.environment} mode on port ${config.port}`);
    });

    // Graceful Shutdown Handler
process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
  });
  
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
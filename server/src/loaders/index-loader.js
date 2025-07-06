// src/loaders/index.js

import logger from '../utils/logger/color-logger.js';
import { connectToDB } from './mongoose-loader.js';
import { initializeExpress } from './express-loader.js';

/**
 * Initializes core application loaders in the correct order
 * Focused on Express and MongoDB for initial setup
 */
export const initializeApp = async () => {
  try {
    logger.info('Initializing application...');
    
    // Initialize MongoDB first
    logger.info('Initializing database connection...');
    const dbConnection = await connectToDB();
    logger.success('Database connection established');
    
    // Initialize Express application
    logger.info('Initializing Express application...');
    const app = initializeExpress();
    logger.success('Express application initialized');
    
    // Create HTTP server
    const server = app.listen(process.env.PORT || 5000, () => {
      logger.success(`Server running on port ${process.env.PORT || 5000}`);
    });
    
    logger.success('Application startup completed successfully');
    
    return { app, server, dbConnection };
  } catch (error) {
    logger.error('Application initialization failed', error);
    throw error;
  }
};

/**
 * Shuts down the application gracefully
 */
export const shutdownApp = async (server) => {
  logger.info('Initiating graceful shutdown...');
  
  if (server) {
    server.close(() => {
      logger.info('HTTP server closed');
    });
  }
  
  try {
    // Close MongoDB connection
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState) {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed');
    }
  } catch (error) {
    logger.error('Error during MongoDB disconnection', error);
  }
  
  logger.info('Shutdown complete');
};
// src/loaders/mongoose.loader.js
import { createConnection } from '../config/db.js';
import logger from '../utils/logger/color-logger.js'
import mongoose from 'mongoose';
export const setupEvents = ()=>{
   // Add event listeners for connection status
    mongoose.connection.on('error', (error) => {
        logger.error('MongoDB connection failed', error);
    });
    
    mongoose.connection.on('disconnected', (error) => {
        logger.info('MongoDB connection failed', error);
    });
    
    // Handle graceful shutdown
    // This code is a graceful shutdown handler for your Node.js app 
    // when it’s being stopped manually — like pressing Ctrl + C in the terminal.

    /*
    Why This Is Important

    Without this:
	•	MongoDB connection might stay open
	•	App might exit abruptly and leave stuff hanging
	•	Looks unprofessional in production
    */
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed due to app termination');
      process.exit(0);
    });
    
   
  
}

export const connectToDB = async () => {
  try {
    const connection = await createConnection();
    setupEvents();
    logger.success(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    throw error;
  }
};
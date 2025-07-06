// src/loaders/express.loader.js


import createApp from '../app.js';
import logger from '../utils/logger/color-logger.js';
import { errorHandler, notFound } from '../api/v1/middlewares/error-middleware.js';
import v1Routes from '../api/v1/index.js';
// Import routes
//import v1Routes from '../api/v1/routes/index.js';

/**
 * Initializes the Express application with middleware and routes
 */
export const initializeExpress = () => {
  try {
    logger.info('Initializing Express application...');
    
    // Create Express app
    const app = createApp();
    
    // Add request logging middleware
    app.use((req, res, next) => {
      // Log at the start of the request
      logger.http(`${req.method} ${req.originalUrl}`);
      
      // Track response for logging after completion
      const startTime = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - startTime;
        logger.http(req.method, req.originalUrl, res.statusCode, `${duration}ms`);
      });
      
      next();
    });
    
    // API version routes
    //app.use('/api/v1', v1Routes);
    
    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', message: 'Server is running' });
    });
    app.use('/api/v1', v1Routes);
    app.use(notFound);
    app.use(errorHandler);
    
    logger.success('Express application initialized successfully');
    
    return app;
  } catch (error) {
    logger.error('Failed to initialize Express application', error);
    throw error;
  }
};
// src/app.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import fileUpload from 'express-fileupload';
import createError from 'http-errors';

/**
 * Creates and configures the Express application
 * Pure Express configuration without business logic or initialization
 */
const createApp = () => {
  // Create Express application
  const app = express();
  
  // Built-in middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  // Third-party middleware
  const allowedOrigins = ["http://localhost:5173"];



app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // allow credentials (even though we use localStorage)
  })
);
  app.use(helmet());
  app.use(compression());
  
  // File upload middleware
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  }));
  
  // Rate limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
  });
  app.use('/api/v1', apiLimiter);
  
  return app;
};

export default createApp;
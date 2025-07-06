// src/api/v1/middlewares/validation.middleware.js

import logger from '../../../utils/logger/color-logger.js';

/**
 * Middleware to validate request using a Joi schema
 * @param {Object} schema - Joi schema
 * @param {String} property - Request property to validate (body, params, query)
 */
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    
    if (!error) {
      return next();
    }
    
    const validationErrors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    
    logger.error(`Validation error: ${JSON.stringify(validationErrors)}`);
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors
    });
  };
};
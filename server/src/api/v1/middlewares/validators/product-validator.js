// src/api/v1/validators/product.validator.js

import Joi from 'joi';

export const productQuerySchema = Joi.object({
  title: Joi.string().trim(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  minRating: Joi.number().min(0).max(5),
  outofstock: Joi.boolean(),
  sort: Joi.string().valid('title', 'price', 'rating', 'createdAt', 'discount'),
  order: Joi.string().valid('asc', 'desc'),
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100)
});

export const productIdSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Product ID must be a valid MongoDB ObjectId'
  })
});
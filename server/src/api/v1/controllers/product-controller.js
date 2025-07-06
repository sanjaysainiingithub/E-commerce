// src/api/v1/controllers/product.controller.js

import * as productService from '../../../services/product-service.js';
import logger from '../../../utils/logger/color-logger.js';
import { asyncHandler } from '../middlewares/error-middleware.js';

/**
 * Get products with filtering, sorting, and pagination
 * @route GET /api/v1/products
 * @access Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  logger.info(`Getting products with filters: ${JSON.stringify(req.query)}`);
  
  const result = await productService.getProducts(req.query);
  
  logger.success(`Found ${result.products.length} products (page ${result.pagination.page}/${result.pagination.totalPages})`);
  
  res.status(200).json({
    success: true,
    pagination: result.pagination,
    data: result.products
  });
});

/**
 * Get product by ID
 * @route GET /api/v1/products/:id
 * @access Public
 */
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  logger.info(`Getting product with ID: ${id}`);
  
  const product = await productService.getProductById(id);
  
  if (!product) {
    logger.error(`Product with ID ${id} not found`);
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  logger.success(`Found product: ${product.title}`);
  
  res.status(200).json({
    success: true,
    data: product
  });
});
// src/api/v1/routes/product.route.js

import express from 'express';
import * as productController from '../controllers/product-controller.js';
import { validate } from '../middlewares/validator-middleware.js';
import { productQuerySchema, productIdSchema } from '../middlewares/validators/product-validator.js';

const router = express.Router();

/**
 * @route   GET /api/v1/products
 * @desc    Get products with filtering, sorting, and pagination
 * @access  Public
 * 
 * Query parameters:
 * - title: Filter by title (partial match)
 * - minPrice: Minimum price
 * - maxPrice: Maximum price
 * - minRating: Minimum rating
 * - outofstock: Filter by stock status (true/false)
 * - sort: Field to sort by (title, price, rating, createdAt, discount)
 * - order: Sort order (asc/desc)
 * - page: Page number
 * - limit: Items per page
 */
router.get('/', validate(productQuerySchema, 'query'), productController.getProducts);

/**
 * @route   GET /api/v1/products/:id
 * @desc    Get a product by ID
 * @access  Public
 */
router.get('/:id', validate(productIdSchema, 'params'), productController.getProductById);

export default router;
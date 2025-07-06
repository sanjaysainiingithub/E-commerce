// src/services/product.service.js

import Product from '../models/product-model.js';

/**
 * Get products with filtering, sorting, and pagination
 * @param {Object} queryParams - Query parameters from request
 * @returns {Promise<Object>} - Products and pagination info
 */
export const getProducts = async (queryParams) => {
  // Extract query parameters with defaults
  const {
    title,
    minPrice,
    maxPrice,
    minRating,
    outofstock,
    sort = 'createdAt',
    order = 'desc',
    page = 1,
    limit = 10
  } = queryParams;

  // Build filter object
  const filter = {};

  // Title filter (case-insensitive partial match)
  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }

  // Price range filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }

  // Rating filter
  if (minRating !== undefined) {
    filter.rating = { $gte: Number(minRating) };
  }

  // Stock status filter
  if (outofstock !== undefined) {
    filter.outofstock = outofstock === 'true';
  }

  // Build sort object
  const sortOption = {};
  sortOption[sort] = order === 'desc' ? -1 : 1;

  // Parse pagination params
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  // Execute queries in parallel for better performance
  const [products, totalProducts] = await Promise.all([
    Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Product.countDocuments(filter)
  ]);

  // Calculate pagination metadata
  const totalPages = Math.ceil(totalProducts / limitNum);

  return {
    products,
    pagination: {
      total: totalProducts,
      page: pageNum,
      limit: limitNum,
      totalPages
    }
  };
};

/**
 * Get a product by ID
 * @param {String} id - Product ID
 * @returns {Promise<Object>} - Product object
 */
export const getProductById = async (id) => {
  const product = await Product.findById(id).lean();
  return product;
};
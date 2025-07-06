// src/api/v1/routes/index.js

import express from 'express';
import productRoutes from './routes/product-routes.js';
import authRoutes from "./routes/auth-routes.js";
import cartRoutes from "./routes/cart-routes.js";
import orderRoutes from "./routes/order-routes.js";
import paymentRoutes from "./routes/payment-routes.js";
const router = express.Router();

// Product routes
router.use('/products', productRoutes);
router.use("/auth", authRoutes);
router.use("/cart", cartRoutes); 
router.use('/payment', paymentRoutes);
router.use("/order", orderRoutes); 
export default router;
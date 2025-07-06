// src/api/v1/routes/order-routes.js

import express from "express";
import { placeOrder, getOrders } from "../controllers/order-controller.js";
import  protect  from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/place", protect, placeOrder);
router.get("/", protect, getOrders);
export default router;
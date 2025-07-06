// src/api/v1/controllers/order-controller.js

import Order from "../../../models/order-model.js";
import Cart from "../../../models/cart-model.js";


export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id })
    .populate("items.productId")
    .sort({ createdAt: -1 });

  res.json(orders);
};

export const placeOrder = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { razorpay, address } = req.body;
    

    console.log("📦 Order Request:", { userId, address, razorpay });

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    const order = await Order.create({
      userId,
      items: cart.items,
      amount: totalAmount,
      address: address,
      paymentId: razorpay?.razorpay_payment_id,
     
    });

    console.log("✅ Order Saved:", order._id);

    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    console.error("❌ Order placement failed:", err.message);
    next(err);
  }
};
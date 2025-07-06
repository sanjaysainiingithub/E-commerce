// src/models/order.model.js

import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state:{type:String , required: true},
  street: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, required: true },
}, { _id: false }); // prevent sub _id creation for embedded object

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number, required: true },
      }
    ],
    amount: { type: Number, required: true },
    address: {
      type: addressSchema, // ✅ Embedded address
      required: true,
    },
    paymentId: { type: String, required: true },
    status: { type: String, default: 'Placed' }, // Placed, Shipped, Delivered, Cancelled
  },
  { timestamps: true }
);

export default mongoose.model('orders', orderSchema);
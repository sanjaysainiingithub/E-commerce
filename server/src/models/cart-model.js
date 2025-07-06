import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model("carts", cartSchema);
export default Cart;
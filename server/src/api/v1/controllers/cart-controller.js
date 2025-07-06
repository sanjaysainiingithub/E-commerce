import Cart from "../../../models/cart-model.js";
import Product from "../../../models/product-model.js";
export const getCart = async (req, res) => {
   console.log(`HTTP › ${req.method} ${req.originalUrl} ${req.user?._id || "-"} ${req.headers.authorization?.slice(0, 20) || "-"}`);
  console.log("🔍 getCart: req.user =", req.user);
  try{
  const cart = await Cart.findOne({ userId: req.user._id }).populate({
    path: "items.productId",
    model: "products", // ✅ FIX: explicitly use the correct model name
  });
  console.log('Cart ', cart);
  res.json(cart || { items: [] });
}
catch(err){
  console.log('Err in getCart ', err);
  res.json( { items: [] });
}
  
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      userId: req.user._id,
      items: [{ productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex((i) => i.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
  }

  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
  await cart.save();

  res.json(cart);
};

export const clearCart = async (req, res) => {
  await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });
  res.json({ message: "Cart cleared" });
};
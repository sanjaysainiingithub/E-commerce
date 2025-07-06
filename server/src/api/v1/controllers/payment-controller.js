// payment.controller.js
import Razorpay from "razorpay";
const init = ()=>{
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
return razorpay;
}
export const createOrder = async (req, res) => {
  const { amount } = req.body;
  const razorpay = init();
  const options = {
    amount: amount * 100, // in paise
    currency: "INR",
    receipt: `order_rcptid_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);
  res.status(200).json(order);
};
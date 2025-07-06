import { useState } from "react";
import { AddressForm } from "../components/Address";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useCartStore } from "../../cart/store/cartStore";
import { useNavigate } from "react-router-dom";
import api from "@/shared/services/axios";

const CheckoutPage = () => {
  const [address, setAddress] = useState(null);
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleAddressSubmit = (values: any) => {
    setAddress(values);
    handlePayment(values);
  };

  const handlePayment = async (addressInfo: any) => {
    console.log('Address Info is ', addressInfo);
    try {
      const { data } = await axios.post(
        "http://localhost:1234/api/v1/payment/order",
        { amount: calculateTotal(items) },
        { withCredentials: true }
      );

      const options = {
        key: "rzp_test_GJ4YXSROXCv8M6", // Replace with yours
        amount: data.amount,
        currency: data.currency,
        name: "Brain Mentors",
        description: "E-Commerce Purchase",
        order_id: data.id,
        handler: async function (response: any) {
          // Payment Success → place order
          await api.post(
            "/order/place",
            {
              address: addressInfo,
              razorpay: response,
            },
            { withCredentials: true }
          );
          clearCart();
          navigate("/orders");
        },
        prefill: {
          name: addressInfo.name,
          contact: addressInfo.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Payment Error", err);
    }
  };

  const calculateTotal = (cartItems: any[]) =>
    cartItems.reduce(
      (acc, item) => acc + item.quantity * item.productId.price,
      0
    );

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>
      <AddressForm onSubmit={handleAddressSubmit} />
    </div>
  );
};

export default CheckoutPage;
import React, { useEffect, useState } from "react";
import api from "../../../shared/services/axios"; // ✅ Axios instance with token
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/order");
      setOrders(data);
      console.log("Order is ", data);
    } catch (err) {
      console.error("❌ Failed to fetch orders", err);
    }
  };

  const calculateTotal = (items: any[]) =>
    items.reduce(
      (acc, item) => acc + (item.quantity * (item.productId?.price || 0)),
      0
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📦 Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl mb-2">😕 No orders placed yet</p>
          <p className="text-sm mb-6">Start shopping to see your orders here.</p>
          <Button onClick={() => navigate("/")}>🛍 Continue Shopping</Button>
        </div>
      ) : (
        <>
          {orders.map((order) => (
            <Card key={order._id} className="mb-6 shadow-md">
              <CardHeader>
                <CardTitle>🧾 Order #{order._id.slice(-6)}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Placed on {format(new Date(order.createdAt), "PPPpp")}
                </p>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">📍 Delivery Address:</p>
                <pre className="text-sm mb-4 bg-gray-50 p-3 rounded">
                  {order.address.name}, {order.address.street},{" "}
                  {order.address.city} {order.address.pincode},{" "}
                  {order.address.phone}
                </pre>

                <Separator className="my-4" />

                <p className="font-semibold mb-2">🛍 Items:</p>
                <ul className="space-y-2 text-sm">
                  {order.items.map((item) => (
                    <li
                      key={item.productId?._id || item._id}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item.productId?.image}
                        alt={item.productId?.title}
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <span className="flex-1">{item.productId?.title || "Unnamed Product"}</span>
                      <span>x{item.quantity}</span>
                    </li>
                  ))}
                </ul>

                <Separator className="my-4" />
                <p className="text-right font-semibold">
                  💰 Total: ₹{calculateTotal(order.items)}
                </p>
              </CardContent>
            </Card>
          ))}
          <div className="text-center mt-6">
            <Button onClick={() => navigate("/")}>🛍 Continue Shopping</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderHistoryPage;
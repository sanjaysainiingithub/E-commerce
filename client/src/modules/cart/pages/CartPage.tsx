import React, { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { items, fetchCart, removeItem, clearCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="flex justify-center items-start py-10 px-4 min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl">
        <Button
          variant="ghost"
          className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        <Card className="w-full shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">🛒 Your Cart</CardTitle>
          </CardHeader>

          <CardContent>
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Your cart is empty.
              </p>
            ) : (
              <>
                <ScrollArea className="max-h-96 pr-2">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.productId._id}
                        className="flex items-center gap-4 border p-3 rounded-md"
                      >
                        <img
                          src={item.productId.image}
                          alt={item.productId.title}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.productId.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(item.productId._id)}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>

                <Separator className="my-4" />

                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={clearCart}>
                    🧹 Clear Cart
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => navigate("/checkout")}
                    className="bg-blue-600 text-white"
                  >
                    🧾 Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
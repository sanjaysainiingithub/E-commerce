import { create } from "zustand";

import api from "../../../shared/services/axios";
interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  fetchCart: () => void;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  fetchCart: async () => {
    const res = await api.get("/cart");
    set({ items: res.data.items });
  },
  addItem: async (productId, quantity = 1) => {
    await api.post("/cart/add", { productId, quantity });
    const res = await api.get("/cart");
    set({ items: res.data.items });
  },
  removeItem: async (productId) => {
    await api.delete(`/cart/remove/${productId}`);
    const res = await api.get("/cart");
    set({ items: res.data.items });
  },
  clearCart: async () => {
    await api.delete("/cart/clear");
    set({ items: [] });
  },
}));
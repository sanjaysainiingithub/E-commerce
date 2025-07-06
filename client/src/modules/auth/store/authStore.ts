import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("bm-user") || "null"),
  token: localStorage.getItem("bm-token"),
  setAuth: (user, token) => {
    localStorage.setItem("bm-user", JSON.stringify(user));
    localStorage.setItem("bm-token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("bm-user");
    localStorage.removeItem("bm-token");
    set({ user: null, token: null });
  },
}));
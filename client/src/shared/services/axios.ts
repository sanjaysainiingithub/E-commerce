import axios from "axios";
import { useAuthStore } from "@/modules/auth/store/authStore";

// ✅ Create axios instance
const api = axios.create({
   baseURL: "http://localhost:1234/api/v1",
  withCredentials: true,
});

// ✅ Add interceptor to inject token from Zustand
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bm-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
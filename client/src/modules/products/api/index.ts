// src/modules/products/api/index.ts

import axios from 'axios';
import type { ProductFilterParams, ProductResponse, ProductsResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const getProducts = async (params?: ProductFilterParams) => {
  const response = await axios.get<ProductsResponse>(`${API_URL}/products`, { params });
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get<ProductResponse>(`${API_URL}/products/${id}`);
  return response.data;
};

export const searchProducts = async (query: string) => {
  if (!query.trim()) return { data: [] };
  
  const response = await axios.get<ProductsResponse>(`${API_URL}/products`, { 
    params: { title: query, limit: 5 } 
  });
  
  return response.data;
};
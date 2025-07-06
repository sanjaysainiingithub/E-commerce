// src/modules/products/types/index.ts

export interface Product {
  _id: string;
  title: string;
  desc: string;
  rating: number;
  price: number;
  qty: number;
  discount: number;
  outofstock: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductsResponse = {
  success: boolean;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: Product[];
};

export type ProductResponse = {
  success: boolean;
  data: Product;
};

export type ProductFilterParams = {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  outofstock?: boolean;
  sort?: 'title' | 'price' | 'rating' | 'createdAt' | 'discount';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};
// src/modules/products/hooks/use-product.ts

import { useState, useEffect } from 'react';
import type { Product, ProductFilterParams } from '../types';
import * as productsApi from '../api';

export function useProducts(initialParams?: ProductFilterParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<ProductFilterParams>(initialParams || {
    page: 1,
    limit: 12,
    sort: 'createdAt',
    order: 'desc'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await productsApi.getProducts(params);
        setProducts(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [params]);

  const updateParams = (newParams: Partial<ProductFilterParams>) => {
    setParams(prev => ({
      ...prev,
      ...newParams,
      // Reset to page 1 when filters change (unless page is explicitly set)
      ...(newParams.page ? {} : { page: 1 })
    }));
  };

  return { 
    products, 
    pagination, 
    isLoading, 
    error, 
    params, 
    updateParams 
  };
}
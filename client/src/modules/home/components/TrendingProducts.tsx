// src/modules/home/components/TrendingProducts.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/modules/products/components/ProductCard';
import { Button } from '../../../shared/components/ui/button';
import { getProducts } from '@/modules/products/api';

export function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch top-rated products
    getProducts({ sort: 'rating', order: 'desc', limit: 4 })
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  
  return (
    <section className="py-8">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Trending Products</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/products">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? 
            // Loading skeletons
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 animate-pulse rounded" />
            )) : 
            // Product cards
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          }
        </div>
      </div>
    </section>
  );
}
// src/modules/home/pages/HomePage.tsx

import { useState, useEffect } from 'react';
import { Header } from '@/shared/components/Header';
import { Footer } from '@/shared/components/Footer';
import { HeroBanner } from '../components/HeroBanner';
import { TrendingProducts } from '../components/TrendingProducts';
import { ProductGrid } from '@/modules/products/components/ProductGrid';
import { ProductFilter } from '@/modules/products/components/ProductFilter';
import { Pagination } from '@/modules/products/components/Pagination';
import { Button } from '@/shared/components/ui/button';
import { useProducts } from '@/modules/products/hooks/use-product';
import type { ProductFilterParams } from '@/modules/products/types';
import { Toaster } from 'sonner';
import { X, Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { useCartStore } from '../../cart/store/cartStore'; // adjust if your path differs
import { toast } from 'sonner';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const addItem = useCartStore((state) => state.addItem);
  const { 
    products, 
    pagination, 
    isLoading, 
    params, 
    updateParams 
  } = useProducts({
    page: 1,
    limit: 12,
    sort: 'createdAt',
    order: 'desc'
  });
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateParams({ title: query });
  };
  
  const handleFilterChange = (filters: ProductFilterParams) => {
    updateParams(filters);
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };
  
  const handlePageChange = (page: number) => {
    updateParams({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // const handleAddToCart = (productId: string) => {

  //   setCartItems((prev) => [...prev, productId]);
  //   // In a real app, you would dispatch to a cart store/context here
  // };
  
  

const handleAddToCart = async (productId: string) => {
  try {
    console.log('Handle Add to Cart Call....');
    await addItem(productId, 1); // Default quantity = 1
    toast.success("Added to cart");
  } catch (error: any) {
    console.error("Add to cart failed", error);
    toast.error("Failed to add to cart");
  }
};

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onSearch={handleSearch}
        cartItemsCount={useCartStore((state) => state.items.length)}
        isLoggedIn={false}
      />
      
      <main className="flex-grow">
        <HeroBanner />
        
        <TrendingProducts />
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">All Products</h2>
              
              {/* Mobile Filter Button */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter size={16} />
                      <span>Filters</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      <ProductFilter 
                        initialValues={params}
                        onFilterChange={handleFilterChange}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            {searchQuery && (
              <div className="mb-4 flex items-center">
                <span className="mr-2">Search results for:</span>
                <div className="flex items-center bg-primary/10 py-1 px-3 rounded-full text-sm">
                  <span>{searchQuery}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 text-gray-500"
                    onClick={() => {
                      setSearchQuery('');
                      updateParams({ title: undefined });
                    }}
                  >
                    <X size={12} />
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Desktop Sidebar */}
              <div className="hidden md:block w-full md:w-64 shrink-0">
                <div className="sticky top-20">
                  <ProductFilter 
                    initialValues={params}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </div>
              
              {/* Product Grid */}
              <div className="flex-grow">
                <ProductGrid 
                  products={products} 
                  isLoading={isLoading}
                  onAddToCart={(product) => handleAddToCart(product._id)}
                />
                
                {!isLoading && pagination.totalPages > 1 && (
                  <Pagination 
                    currentPage={pagination.page} 
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
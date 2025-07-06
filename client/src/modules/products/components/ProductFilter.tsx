// src/modules/products/components/ProductFilter.tsx

import { useForm } from 'react-hook-form';

// Define the types based on your data structure
interface ProductFilterParams {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  outofstock?: boolean;
  sort?: 'title' | 'price' | 'rating' | 'createdAt' | 'discount';
  order?: 'asc' | 'desc';
}

interface ProductFilterProps {
  initialValues: ProductFilterParams;
  onFilterChange: (filters: ProductFilterParams) => void;
}

export function ProductFilter({ initialValues, onFilterChange }: ProductFilterProps) {
  const {  handleSubmit, watch, setValue } = useForm<ProductFilterParams>({
    defaultValues: {
      minPrice: initialValues.minPrice || 0,
      maxPrice: initialValues.maxPrice || 1000,
      minRating: initialValues.minRating || 0,
      outofstock: initialValues.outofstock || false,
      sort: initialValues.sort || 'createdAt',
      order: initialValues.order || 'desc',
    }
  });

  // Get current values for display
  const minPrice = watch('minPrice');
  const maxPrice = watch('maxPrice');
  const minRating = watch('minRating');

  // Using basic HTML elements instead of shadcn UI to avoid import errors
  return (
    <form onSubmit={handleSubmit(onFilterChange)} className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between">
              <label>Min Price</label>
              <span>${minPrice}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={minPrice}
              onChange={(e) => setValue('minPrice', Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex justify-between">
              <label>Max Price</label>
              <span>${maxPrice}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={maxPrice}
              onChange={(e) => setValue('maxPrice', Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Rating */}
      <div>
        <div className="flex justify-between">
          <label>Minimum Rating</label>
          <span>{minRating} ★</span>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={minRating}
          onChange={(e) => setValue('minRating', Number(e.target.value))}
          className="w-full"
        />
      </div>
      
      {/* Stock Option */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="outofstock"
          checked={watch('outofstock')}
          onChange={(e) => setValue('outofstock', e.target.checked)}
        />
        <label htmlFor="outofstock" className="cursor-pointer">
          Show out of stock items
        </label>
      </div>
      
      {/* Sort Options */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <select
            value={watch('sort')}
            onChange={(e) => setValue('sort', e.target.value as any)}
            className="w-full p-2 border rounded"
          >
            <option value="title">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="createdAt">Newest</option>
            <option value="discount">Discount</option>
          </select>
        </div>
        
        <div>
          <select
            value={watch('order')}
            onChange={(e) => setValue('order', e.target.value as any)}
            className="w-full p-2 border rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </form>
  );
}
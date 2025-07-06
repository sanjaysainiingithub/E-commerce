// src/modules/products/components/ProductCard.tsx

import { Link } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
 product: Product;
 onAddToCart?: (product: Product, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
 const { _id, title, desc, price, rating, discount, outofstock,image } = product;
 const discountedPrice = discount ? price * (1 - discount/100) : price;
 const [quantity, setQuantity] = useState(1);
 const [isAdding, setIsAdding] = useState(false);
 
 
 
 const handleAddToCart = async (e: React.MouseEvent) => {
   e.preventDefault();
   e.stopPropagation();
   
   if (outofstock || !onAddToCart) return;
   
   setIsAdding(true);
   try {
     await onAddToCart(product, quantity);
     // Show success feedback (you can add toast here)
     console.log(`Added ${quantity} ${title} to cart`);
   } catch (error) {
     console.error('Failed to add to cart:', error);
   } finally {
     setIsAdding(false);
   }
 };
 
 const updateQuantity = (newQuantity: number) => {
   if (newQuantity >= 1 && newQuantity <= product.qty) {
     setQuantity(newQuantity);
   }
 };
 
 return (
   <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow">
     <Link to={`/products/${_id}`} className="flex-1 flex flex-col">
       {/* Product Image */}
       <div className="relative h-48 overflow-hidden">
         <img 
           src={image} 
           alt={title}
           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
         />
         {discount > 0 && (
           <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
             -{discount}%
           </span>
         )}
         {outofstock && (
           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
             <span className="bg-white text-gray-800 px-3 py-1 rounded font-medium">Out of Stock</span>
           </div>
         )}
       </div>
       
       <div className="p-4 flex-1 flex flex-col">
         {/* Title */}
         <h3 className="font-medium line-clamp-2 mb-2">{title}</h3>
         
         {/* Description */}
         <p className="text-sm text-gray-500 line-clamp-2 mb-2 flex-1">{desc}</p>
         
         {/* Rating stars */}
         <div className="flex items-center text-yellow-400 mb-2">
           {"★".repeat(Math.floor(rating))}
           {"☆".repeat(5 - Math.floor(rating))}
           <span className="ml-1 text-xs text-gray-600">({rating.toFixed(1)})</span>
         </div>
         
         {/* Price display */}
         <div className="mb-3">
           <span className="text-lg font-semibold text-gray-900">${discountedPrice.toFixed(2)}</span>
           {discount > 0 && (
             <span className="ml-2 text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
           )}
         </div>
         
         {/* Stock info */}
         {!outofstock && (
           <div className="text-xs text-gray-500 mb-2">
             {product.qty < 10 ? `Only ${product.qty} left` : `${product.qty} in stock`}
           </div>
         )}
       </div>
     </Link>
     
     {/* Add to cart section */}
     <div className="p-4 pt-0 space-y-3">
       {!outofstock && (
         /* Quantity selector */
         <div className="flex items-center justify-center gap-3">
           <button
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               updateQuantity(quantity - 1);
             }}
             disabled={quantity <= 1}
             className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <Minus size={14} />
           </button>
           
           <span className="w-12 text-center font-medium">{quantity}</span>
           
           <button
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               updateQuantity(quantity + 1);
             }}
             disabled={quantity >= product.qty}
             className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <Plus size={14} />
           </button>
         </div>
       )}
       
       {/* Add to cart button */}
       <Button
         className="w-full"
         disabled={outofstock || isAdding}
         onClick={handleAddToCart}
         variant={outofstock ? "outline" : "default"}
       >
         {outofstock ? (
           "Out of Stock"
         ) : isAdding ? (
           "Adding..."
         ) : (
           <>
             <ShoppingCart className="mr-2 h-4 w-4" />
             Add {quantity > 1 ? `${quantity} ` : ''}to Cart
           </>
         )}
       </Button>
     </div>
   </Card>
 );
}
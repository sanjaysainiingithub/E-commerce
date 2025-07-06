// src/shared/components/Header.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, ShoppingCart, User, X } from 'lucide-react';
import { SearchBar } from '../../modules/products/components/SearchBar';
import { useAuthStore } from '../../modules/auth/store/authStore';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../../modules/cart/store/cartStore';


interface HeaderProps {
 isLoggedIn?: boolean;
 userName?: string;
 cartItemsCount?: number;
 cartTotal?: number;
 onSearch?: (query: string) => void;
}

export function Header({ 
 isLoggedIn = false, 
 userName = '', 
 cartItemsCount = 0,
 cartTotal = 0,
 onSearch = () => {}
}: HeaderProps) {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
 cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
 cartTotal = items.reduce((acc, item) => acc + (item.productId?.price || 0) * item.quantity, 0);
 return (
   <header className="bg-red-600 border-b sticky top-0 z-50 shadow-md">
     <div className="container mx-auto px-4 h-16 flex items-center justify-between">
       {/* Logo */}
       <Link to="/" className="font-bold text-xl text-white">
         <span className="text-yellow-300">Shop</span>Mart
       </Link>
       
       {/* Desktop Search */}
       <div className="hidden md:flex flex-1 max-w-xl mx-8">
         <SearchBar onSearch={onSearch} />
       </div>
       
       {/* Desktop Menu */}
       <nav className="hidden md:flex items-center gap-4">
         <Link to="/products" className="text-white hover:text-yellow-300">Products</Link>
         {!user ? (
        <>
          <Link className="px-3 py-1 border border-white text-white rounded hover:bg-white hover:text-red-600" to="/login">Login</Link>
          <Link className="px-3 py-1 border border-white text-white rounded hover:bg-white hover:text-red-600" to="/register">Register</Link>
        </>
      ) : (
        <>
        <span className="text-lg text-white font-semibold text-foreground">
  👋 Welcome, <span className="text-green-400">{user.name}</span>
</span>
        
          <Button variant="outline" onClick={logout} className="gap-2">
  <LogOut size={16} />
  Logout
</Button>
        </>
      )}
         {/* {isLoggedIn ? (
           <div className="relative group">
             <button className="flex items-center gap-2 px-3 py-1 rounded hover:bg-red-700 text-white">
               <User size={16} />
               {userName}
             </button>
             <div className="absolute right-0 mt-1 w-40 bg-white border rounded shadow-lg hidden group-hover:block">
               <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
               <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
               <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
             </div>
           </div>
         ) : (
           <Link to="/login" className="px-3 py-1 border border-white text-white rounded hover:bg-white hover:text-red-600">Login</Link>
         )} */}
         
         {/* Cart with total */}
         <Link to="/cart" className="relative p-2 flex items-center gap-2 hover:bg-red-700 rounded text-white">
           <div className="relative">
             <ShoppingCart size={20} />
             {cartItemsCount > 0 && (
               <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">
                 {cartItemsCount > 99 ? '99+' : cartItemsCount}
               </span>
             )}
           </div>
           {cartTotal > 0 && (
             <div className="hidden lg:block">
               <div className="text-xs text-red-200">Cart</div>
               <div className="text-sm font-semibold text-white">${cartTotal.toFixed(2)}</div>
             </div>
           )}
         </Link>
       </nav>
       
       {/* Mobile */}
       <div className="md:hidden flex items-center gap-2">
         <Link to="/cart" className="relative p-2 flex items-center gap-1 text-white">
           <div className="relative">
             <ShoppingCart size={18} />
             {cartItemsCount > 0 && (
               <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-600 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center">
                 {cartItemsCount > 9 ? '9+' : cartItemsCount}
               </span>
             )}
           </div>
           {cartTotal > 0 && (
             <span className="text-xs font-medium">${cartTotal.toFixed(2)}</span>
           )}
         </Link>
         <button onClick={() => setIsMenuOpen(true)} className="p-2 text-white">
           <Menu size={16} />
         </button>
       </div>
     </div>
     
     {/* Mobile Menu */}
     {isMenuOpen && (
       <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
         <div className="fixed right-0 top-0 h-full w-[300px] bg-white p-4">
           <div className="flex justify-between items-center mb-4">
             <span className="font-bold">Menu</span>
             <button onClick={() => setIsMenuOpen(false)}>
               <X size={20} />
             </button>
           </div>
           
           {/* Cart summary in mobile menu */}
           {cartItemsCount > 0 && (
             <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
               <div className="flex justify-between items-center">
                 <span className="text-sm font-medium">Cart Summary</span>
                 <Link to="/cart" className="text-red-600 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                   View Cart
                 </Link>
               </div>
               <div className="text-lg font-bold text-red-600">
                 {cartItemsCount} items • ${cartTotal.toFixed(2)}
               </div>
             </div>
           )}
           
           <div className="mb-4 pb-4 border-b">
             <SearchBar onSearch={(query) => {
               onSearch(query);
               setIsMenuOpen(false);
             }} />
           </div>
           
           <nav className="space-y-2">
             <Link to="/" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>Home</Link>
             <Link to="/products" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>Products</Link>
             
             {isLoggedIn ? (
               <>
                 <div className="px-4 py-2 text-sm font-medium border-t pt-4">Welcome, {userName}</div>
                 <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                 <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>Orders</Link>
                <button
  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
  onClick={() => {
    logout();
    setIsMenuOpen(false);
  }}
>
  Logout
</button> 
               </>
             ) : (
               <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>Login</Link>
             )}
           </nav>
         </div>
       </div>
     )}
   </header>
 );
}
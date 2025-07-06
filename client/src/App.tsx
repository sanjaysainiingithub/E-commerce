// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HomePage } from './modules/home/pages/HomePage';
import LoginForm from './modules/auth/pages/LoginForm';
import RegisterForm from './modules/auth/pages/RegisterForm';
import CartPage from './modules/cart/pages/CartPage';
import CheckoutPage from './modules/order/pages/CheckOut';
import OrderHistoryPage from './modules/order/pages/OrderHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<RegisterForm />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/orders" element={<OrderHistoryPage />} />
        {/* Add other routes here when implementing them */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
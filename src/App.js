import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();
  
  // Initialize cart and wishlist from localStorage
  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem('sneakerhub_cart_count');
    return savedCart ? parseInt(savedCart) : 0;
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('sneakerhub_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save cart count to localStorage
  useEffect(() => {
    localStorage.setItem('sneakerhub_cart_count', cartCount.toString());
  }, [cartCount]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('sneakerhub_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (productId) => {
    setCartCount(prev => prev + 1);
    alert(`Đã thêm sản phẩm vào giỏ hàng!`);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={user?.isAdmin ? <AdminPage /> : <Navigate to="/" />} />
      
      <Route path="/" element={<Layout cartCount={cartCount} />}>
        <Route index element={
          <HomePage 
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        } />
        <Route path="products" element={
          <ProductsPage 
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        } />
        <Route path="categories" element={
          <CategoriesPage 
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        } />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cart" element={<CartPage cartCount={cartCount} />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
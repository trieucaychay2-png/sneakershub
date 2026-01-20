import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ cartCount = 3 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState(''); // Thêm state cho search
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Trang Chủ' },
    { path: '/products', label: 'Sản Phẩm' },
    { path: '/categories', label: 'Danh Mục' },
    { path: '/about', label: 'Giới Thiệu' },
    { path: '/contact', label: 'Liên Hệ' }
  ];

  // Hàm xử lý tìm kiếm đơn giản
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Điều hướng đến trang sản phẩm với query string
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(''); // Reset search
    }
  };

  // Xử lý khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    logout();
    alert('Bạn đã đăng xuất!');
  };

  return (
    <header className="sneakerhub-header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/" className="logo">SneakerHub</Link>
          <p className="tagline">Nâng tầm phong cách với từng bước chân</p>
        </div>
        
        {/* Thay đổi phần search */}
        <div className="search-section">
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="search-btn" 
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        
        <nav className="main-navigation">
          <ul className="nav-list">
            {navItems.map(item => (
              <li key={item.path} className={`nav-item ${isActive(item.path) ? 'active' : ''}`}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="header-actions">
          <Link to="/cart" className="cart-btn" title="Giỏ hàng">
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          
          {isAuthenticated ? (
            <div className="user-menu">
              <Link to="/profile" className="user-btn" title="Hồ sơ cá nhân">
                <i className="fas fa-user"></i>
              </Link>
              {user?.isAdmin && (
                <Link to="/admin" className="admin-btn" title="Admin Panel">
                  <i className="fas fa-cog"></i>
                </Link>
              )}
              <button className="logout-btn" onClick={handleLogout} title="Đăng xuất">
                <i className="fas fa-sign-out-alt"></i>
              </button>
              <span className="user-name">{user?.fullName || 'Người dùng'}</span>
            </div>
          ) : (
            <div className="auth-dropdown">
              <button 
                className="auth-menu-btn"
                onClick={() => setShowAuthMenu(!showAuthMenu)}
                title="Tài khoản"
              >
                <i className="fas fa-user"></i>
                <span>Tài Khoản</span>
                <i className={`fas fa-chevron-down ${showAuthMenu ? 'rotate' : ''}`}></i>
              </button>
              {showAuthMenu && (
                <div className="auth-menu-dropdown">
                  <Link 
                    to="/login" 
                    className="auth-menu-item login-item"
                    onClick={() => setShowAuthMenu(false)}
                  >
                    <i className="fas fa-sign-in-alt"></i> Đăng Nhập
                  </Link>
                  <Link 
                    to="/register" 
                    className="auth-menu-item register-item"
                    onClick={() => setShowAuthMenu(false)}
                  >
                    <i className="fas fa-user-plus"></i> Đăng Ký
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartCount }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: "Giày Chạy Bộ Nike Air Max 270", 
      price: 2450000, 
      quantity: 1, 
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60",
      size: 42,
      color: "Đen/Trắng"
    },
    { 
      id: 2, 
      name: "Giày Sneaker Adidas Ultraboost 22", 
      price: 3200000, 
      quantity: 2, 
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60",
      size: 41,
      color: "Trắng"
    },
    { 
      id: 3, 
      name: "Giày Tây Da Bò Đen Oxford", 
      price: 1850000, 
      quantity: 1, 
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60",
      size: 40,
      color: "Đen"
    }
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống! Vui lòng thêm sản phẩm trước khi thanh toán.');
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const clearCart = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      setCartItems([]);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateDiscount = () => {
    const total = calculateTotal();
    if (total >= 3000000) {
      return 500000;
    } else if (total >= 2000000) {
      return 300000;
    }
    return 0;
  };

  const calculateFinalTotal = () => {
    const total = calculateTotal();
    const discount = calculateDiscount();
    return total - discount;
  };

  return (
    <>
      <div className="page-header">
        <h1>Giỏ Hàng Của Bạn</h1>
        <p>Bạn có {getTotalItems()} sản phẩm trong giỏ hàng</p>
      </div>
      
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <h2>Giỏ hàng của bạn đang trống</h2>
            <p>Hãy khám phá và thêm sản phẩm yêu thích vào giỏ hàng</p>
            <button className="continue-shopping" onClick={handleContinueShopping}>
              <i className="fas fa-shopping-bag"></i> Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items-section">
              <div className="cart-header">
                <h2>Sản Phẩm ({getTotalItems()} sản phẩm)</h2>
                <button className="clear-cart-btn" onClick={clearCart}>
                  <i className="fas fa-trash"></i> Xóa tất cả
                </button>
              </div>
              
              <div className="cart-items">
                {cartItems.map(item => (
                  <div className="cart-item" key={item.id}>
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <div className="item-details">
                        <div className="detail-item">
                          <span className="detail-label">Màu sắc:</span>
                          <span className="detail-value">{item.color}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Size:</span>
                          <span className="detail-value">{item.size}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Đơn giá:</span>
                          <span className="detail-value price">{formatPrice(item.price)}</span>
                        </div>
                      </div>
                      
                      <div className="item-actions">
                        <div className="quantity-control">
                          <button 
                            className="qty-btn minus" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="qty-btn plus"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        
                        <div className="action-buttons">
                          <button 
                            className="save-later-btn"
                            onClick={() => alert(`Đã lưu "${item.name}" để mua sau`)}
                            title="Lưu để mua sau"
                          >
                            <i className="far fa-heart"></i>
                          </button>
                          <button 
                            className="remove-btn" 
                            onClick={() => removeItem(item.id)}
                            title="Xóa sản phẩm"
                          >
                            <i className="fas fa-trash"></i> Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="item-total">
                      <p className="total-price">{formatPrice(item.price * item.quantity)}</p>
                      <p className="unit-price">{formatPrice(item.price)}/sản phẩm</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="cart-summary">
              <h2><i className="fas fa-receipt"></i> Tổng Thanh Toán</h2>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Tạm tính ({getTotalItems()} sản phẩm):</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                
                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span className="free-shipping">
                    <i className="fas fa-check-circle"></i> MIỄN PHÍ
                  </span>
                </div>
                
                {calculateDiscount() > 0 && (
                  <div className="summary-row discount">
                    <span>Giảm giá:</span>
                    <span className="discount-amount">
                      <i className="fas fa-tag"></i> -{formatPrice(calculateDiscount())}
                    </span>
                  </div>
                )}
                
                <div className="summary-row total">
                  <span>Tổng cộng:</span>
                  <span className="final-total">{formatPrice(calculateFinalTotal())}</span>
                </div>
                
                <div className="savings-note">
                  <i className="fas fa-piggy-bank"></i>
                  Bạn đã tiết kiệm được {formatPrice(calculateDiscount())}
                </div>
              </div>
              
              <button className="checkout-btn" onClick={handleCheckout}>
                <i className="fas fa-credit-card"></i> Tiến Hành Thanh Toán
              </button>
              
              <button className="continue-btn" onClick={handleContinueShopping}>
                <i className="fas fa-shopping-bag"></i> Tiếp Tục Mua Sắm
              </button>
              
              <div className="payment-methods">
                <h4><i className="fas fa-shield-alt"></i> Phương thức thanh toán an toàn</h4>
                <div className="payment-icons">
                  <i className="fab fa-cc-visa" title="Visa"></i>
                  <i className="fab fa-cc-mastercard" title="Mastercard"></i>
                  <i className="fab fa-cc-paypal" title="PayPal"></i>
                  <i className="fas fa-qrcode" title="QR Code"></i>
                  <i className="fas fa-money-bill-wave" title="Tiền mặt"></i>
                </div>
              </div>
              
              <div className="promo-banner">
                <h4><i className="fas fa-gift"></i> Ưu đãi đặc biệt</h4>
                <div className="promo-item">
                  <i className="fas fa-shipping-fast"></i>
                  <span>Miễn phí vận chuyển cho đơn hàng từ 1.500.000đ</span>
                </div>
                <div className="promo-item">
                  <i className="fas fa-percentage"></i>
                  <span>Giảm 500.000đ cho đơn hàng từ 3.000.000đ</span>
                </div>
                <div className="promo-item">
                  <i className="fas fa-star"></i>
                  <span>Tích điểm cho mỗi đơn hàng - Đổi quà hấp dẫn</span>
                </div>
              </div>
              
              <div className="security-notice">
                <i className="fas fa-lock"></i>
                <span>Thông tin thanh toán được bảo mật và mã hóa</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
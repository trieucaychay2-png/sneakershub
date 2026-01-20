import React, { useState } from 'react';
import './ProductDetailModal.css';

const ProductDetailModal = ({ product, isOpen, onClose, addToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const discountedPrice = product.price * (1 - product.discount / 100);
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-body">
          <div className="modal-image-container">
            <img src={product.image} alt={product.name} className="modal-product-image" />
            {product.discount > 0 && (
              <div className="discount-badge">{product.discount}%</div>
            )}
          </div>

          <div className="modal-info">
            <h2 className="modal-product-name">{product.name}</h2>

            <div className="modal-rating">
              <i className="fas fa-star"></i>
              <span>{product.rating}/5</span>
            </div>

            <div className="modal-price">
              {product.discount > 0 && (
                <span className="original-price">{formatPrice(product.price)}</span>
              )}
              <span className="discounted-price">{formatPrice(discountedPrice)}</span>
            </div>

            <p className="modal-description">{product.description}</p>

            <div className="modal-options">
              <div className="option-group">
                <label className="option-label">Chọn màu sắc:</label>
                <div className="colors-container">
                  {product.colors && product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label className="option-label">Chọn size:</label>
                <div className="sizes-container">
                  {product.sizes && product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label className="option-label">Số lượng:</label>
                <div className="quantity-container">
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button className="modal-add-to-cart" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;

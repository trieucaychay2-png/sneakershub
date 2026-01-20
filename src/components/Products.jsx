import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import ProductDetailModal from './ProductDetailModal';
import './Products.css';

const Products = ({ addToCart, toggleWishlist, wishlist = [], category = 'all', sortBy = 'default' }) => {
  const { products } = useData();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lọc và sắp xếp sản phẩm
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Lọc theo danh mục
    if (category && category !== 'all') {
      result = result.filter(product => product.category === category);
    }

    // Sắp xếp
    switch(sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.price * (1 - a.discount/100)) - (b.price * (1 - b.discount/100)));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price * (1 - b.discount/100)) - (a.price * (1 - a.discount/100)));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // Giữ nguyên thứ tự mặc định
        break;
    }

    return result;
  }, [products, category, sortBy]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (discount === 0) return price;
    return Math.round(price - (price * discount / 100));
  };

  const getCategoryName = (cat) => {
    const categories = {
      'running': 'Chạy bộ',
      'sneaker': 'Sneaker',
      'formal': 'Giày tây',
      'outdoor': 'Ngoài trời',
      'sandals': 'Sandal',
      'sports': 'Thể thao'
    };
    return categories[cat] || cat;
  };

  return (
    <section className="products-section" id="products">
      <div className="section-header">
        <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
        <div className="divider"></div>
        <p className="section-subtitle">
          {category === 'all' 
            ? 'Khám phá 12 mẫu giày được yêu thích nhất hiện nay'
            : `Tìm thấy ${filteredAndSortedProducts.length} sản phẩm`
          }
        </p>
      </div>

      {filteredAndSortedProducts.length > 0 ? (
        <div className="products-grid">
          {filteredAndSortedProducts.map(product => {
            const isWishlisted = wishlist.includes(product.id);
            const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
            
            return (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.discount > 0 && (
                    <span className="discount-badge">-{product.discount}%</span>
                  )}
                  <span className="product-category">
                    <i className="fas fa-tag"></i> {getCategoryName(product.category)}
                  </span>
                  <div className="product-rating">
                    <i className="fas fa-star"></i>
                    <span>{product.rating}</span>
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  
                  <div className="product-features">
                    <div className="feature-item">
                      <i className="fas fa-palette"></i>
                      <span>{product.colors.length} màu</span>
                    </div>
                    <div className="feature-item">
                      <i className="fas fa-shoe-prints"></i>
                      <span>{product.sizes.length} size</span>
                    </div>
                  </div>
                  
                  <div className="price-container">
                    {product.discount > 0 && (
                      <span className="original-price">{formatPrice(product.price)}</span>
                    )}
                    <p className="product-price">{formatPrice(discountedPrice)}</p>
                  </div>
                  
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-actions">
                    <button 
                      className="view-detail-btn"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                    >
                      <i className="fas fa-eye"></i> Xem chi tiết
                    </button>
                    <button 
                      className={`quick-action-btn ${isWishlisted ? 'wishlisted' : ''}`}
                      onClick={() => toggleWishlist(product.id)}
                      title={isWishlisted ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                    >
                      <i className={`fas ${isWishlisted ? 'fa-heart' : 'fa-heart'}`}></i>
                    </button>
                    <button 
                      className="quick-action-btn"
                      onClick={() => addToCart(product.id)}
                      title="Thêm vào giỏ hàng"
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-products">
          <p>Không tìm thấy sản phẩm nào</p>
        </div>
      )}

      <div className="view-all-container">
        <button 
          className="view-all-btn"
          onClick={() => alert('Tính năng xem tất cả sản phẩm đang phát triển')}
        >
          Xem tất cả sản phẩm <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      <ProductDetailModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addToCart={addToCart}
      />
    </section>
  );
};

export default Products;
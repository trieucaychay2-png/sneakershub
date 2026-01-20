import React, { useState } from 'react';
import './Categories.css';

const Categories = ({ onCategoryChange, onSortChange }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const categories = [
    { id: 'all', name: 'Tất cả', icon: 'fas fa-box' },
    { id: 'running', name: 'Giày Chạy Bộ', icon: 'fas fa-running' },
    { id: 'sneaker', name: 'Sneaker', icon: 'fas fa-shoe-prints' },
    { id: 'formal', name: 'Giày Tây', icon: 'fas fa-briefcase' },
    { id: 'outdoor', name: 'Giày Ngoài Trời', icon: 'fas fa-mountain' },
    { id: 'sandals', name: 'Sandal', icon: 'fas fa-umbrella-beach' },
    { id: 'sports', name: 'Thể Thao', icon: 'fas fa-basketball-ball' }
  ];

  const sortOptions = [
    { id: 'default', name: 'Mặc định', icon: 'fas fa-sort' },
    { id: 'price-low', name: 'Giá thấp đến cao', icon: 'fas fa-sort-amount-down' },
    { id: 'price-high', name: 'Giá cao đến thấp', icon: 'fas fa-sort-amount-down-alt' },
    { id: 'name', name: 'Tên A-Z', icon: 'fas fa-sort-alpha-down' },
    { id: 'rating', name: 'Đánh giá cao', icon: 'fas fa-star' },
    { id: 'discount', name: 'Khuyến mãi', icon: 'fas fa-percentage' }
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  const handleSortClick = (sortId) => {
    setSortBy(sortId);
    if (onSortChange) {
      onSortChange(sortId);
    }
  };

  return (
    <section className="categories-section" id="categories">
      <div className="section-header">
        <h2 className="section-title">Danh Mục Sản Phẩm</h2>
        <div className="divider"></div>
      </div>

      <div className="categories-filter">
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <i className={category.icon}></i> {category.name}
            </button>
          ))}
        </div>

        <div className="sort-section">
          <span className="sort-label">Sắp xếp theo:</span>
          <div className="sort-options">
            {sortOptions.map(option => (
              <button
                key={option.id}
                className={`sort-btn ${sortBy === option.id ? 'active' : ''}`}
                onClick={() => handleSortClick(option.id)}
              >
                <i className={option.icon}></i> {option.name}
                {sortBy === option.id && <span className="check-mark">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
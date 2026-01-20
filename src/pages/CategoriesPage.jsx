import React from 'react';
import Categories from '../components/Categories';
import Products from '../components/Products';

const CategoriesPage = ({ addToCart, toggleWishlist, wishlist }) => {
  return (
    <>
      <div className="page-header">
        <h1>Danh Mục Sản Phẩm</h1>
        <p>Tìm kiếm sản phẩm theo danh mục yêu thích</p>
      </div>
      <Categories />
      <Products 
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        wishlist={wishlist}
      />
    </>
  );
};

export default CategoriesPage;
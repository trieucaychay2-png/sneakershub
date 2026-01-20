import React from 'react';
import Products from '../components/Products';

const ProductsPage = ({ addToCart, toggleWishlist, wishlist }) => {
  return (
    <>
      <div className="page-header">
        <h1>Tất Cả Sản Phẩm</h1>
        <p>Khám phá bộ sưu tập giày đa dạng của chúng tôi</p>
      </div>
      <Products 
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        wishlist={wishlist}
      />
    </>
  );
};

export default ProductsPage;
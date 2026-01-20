import React, { useState } from 'react';
import Categories from '../components/Categories';
import Products from '../components/Products';
import AboutContact from '../components/AboutContact';

const HomePage = ({ addToCart, toggleWishlist, wishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  return (
    <>
      <Categories 
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortOption}
      />
      <Products 
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        wishlist={wishlist}
        category={selectedCategory}
        sortBy={sortOption}
      />
      <AboutContact />
    </>
  );
};

export default HomePage;
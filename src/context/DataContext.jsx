import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    // Load from localStorage khi khởi động
    const savedProducts = localStorage.getItem('sneakerhub_products');
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts);
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
      }
    }

    // Default products nếu không có dữ liệu đã lưu
    return [
      {
        id: 1,
        name: "Giày Chạy Bộ Nike Air Max 270 React",
        price: 2450000,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Giày chạy bộ công nghệ React foam, êm ái và bền bỉ cho chạy đường dài",
        category: "running",
        rating: 4.8,
        discount: 15,
        colors: ["Đỏ", "Đen", "Trắng"],
        sizes: [40, 41, 42, 43]
      },
      {
        id: 2,
        name: "Giày Sneaker Adidas Ultraboost 22",
        price: 3200000,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Sneaker với đế Boost siêu êm ái, thiết kế hiện đại, phong cách trẻ trung",
        category: "sneaker",
        rating: 4.9,
        discount: 10,
        colors: ["Trắng", "Đen", "Xám"],
        sizes: [39, 40, 41, 42, 43]
      },
      {
        id: 3,
        name: "Giày Tây Da Bò Oxford Cao Cấp",
        price: 1850000,
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Giày công sở chất liệu da bò Ý, kiểu dáng Oxford thanh lịch, sang trọng",
        category: "formal",
        rating: 4.7,
        discount: 20,
        colors: ["Đen", "Nâu"],
        sizes: [39, 40, 41, 42]
      },
      {
        id: 4,
        name: "Giày Thể Thao Puma RS-X Turbo",
        price: 1890000,
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Sneaker phong cách retro với thiết kế cổ điển, êm ái cho cả ngày dài",
        category: "sneaker",
        rating: 4.6,
        discount: 25,
        colors: ["Trắng", "Đỏ", "Đen"],
        sizes: [38, 39, 40, 41, 42, 43]
      },
      {
        id: 5,
        name: "Giày Lực Không Khí Casual 2 Tối",
        price: 2082500,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Giày casual với thiết kế tối giản, thoải mái cho đi dạo phố",
        category: "casual",
        rating: 4.5,
        discount: 12,
        colors: ["Đen", "Trắng", "Xám"],
        sizes: [39, 40, 41, 42, 43, 44]
      },
      {
        id: 6,
        name: "Giày Sneaker Trend Hồi Hương",
        price: 2880000,
        image: "https://images.unsplash.com/photo-1614707267537-b85faf00021b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Sneaker xu hướng với họa tiết độc đáo, tôn lên phong cách cá nhân",
        category: "sneaker",
        rating: 4.7,
        discount: 8,
        colors: ["Xanh", "Vàng", "Cam"],
        sizes: [38, 39, 40, 41, 42]
      },
      {
        id: 7,
        name: "Giày Converse Chuck Taylor All Star",
        price: 1490000,
        image: "https://images.unsplash.com/photo-1597045866519-c8739e534e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Giày canvas cổ điển Converse, biểu tượng thể thao lâu đời",
        category: "casual",
        rating: 4.8,
        discount: 5,
        colors: ["Trắng", "Đen", "Hồng"],
        sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43]
      },
      {
        id: 8,
        name: "Giày Chạy Bộ Adidas Predator",
        price: 1470000,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Giày chạy bộ Adidas với công nghệ Predator tối ưu",
        category: "running",
        rating: 4.6,
        discount: 18,
        colors: ["Xanh", "Đen", "Trắng"],
        sizes: [40, 41, 42, 43, 44]
      },
      {
        id: 9,
        name: "Giày Boots Thời Trang Chính Hãng",
        price: 2000000,
        image: "https://images.unsplash.com/photo-1608844248619-249d1b91b426?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Giày boots da thật, kiểu dáng lịch lãm, phù hợp cho mọi dịp",
        category: "formal",
        rating: 4.7,
        discount: 22,
        colors: ["Đen", "Nâu", "Xám"],
        sizes: [39, 40, 41, 42, 43, 44]
      },
      {
        id: 10,
        name: "Giày Lực Khí Mềm Classic",
        price: 1370000,
        image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Giày air cushion cổ điển, nhẹ nhàng và thoải mái",
        category: "casual",
        rating: 4.9,
        discount: 14,
        colors: ["Trắng", "Đen", "Bạc"],
        sizes: [39, 40, 41, 42, 43]
      },
      {
        id: 11,
        name: "Giày Tây Thời Trang Bọc Nâu",
        price: 1982500,
        image: "https://images.unsplash.com/photo-1614707267537-b85faf00021b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Giày tây đẹp, thiết kế hiện đại phù hợp công sở",
        category: "formal",
        rating: 4.6,
        discount: 16,
        colors: ["Nâu", "Đen", "Rêu"],
        sizes: [39, 40, 41, 42, 43, 44]
      },
      {
        id: 12,
        name: "Giày Lợn La Moccasin Handmade",
        price: 1237500,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Giày moccasin handmade, chất liệu da tự nhiên, sang trọng",
        category: "formal",
        rating: 4.8,
        discount: 11,
        colors: ["Nâu", "Đen"],
        sizes: [39, 40, 41, 42, 43]
      }
    ];
  });

  // Save to localStorage mỗi khi products thay đổi
  useEffect(() => {
    localStorage.setItem('sneakerhub_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...updatedProduct, id } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const value = {
    products,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData phải được sử dụng trong DataProvider');
  }
  return context;
};

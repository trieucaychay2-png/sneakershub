import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('sneakerhub_users');
    if (savedUsers) {
      try {
        return JSON.parse(savedUsers);
      } catch (error) {
        console.error('Error loading users from localStorage:', error);
      }
    }

    // Default users
    return [
      {
        id: 1,
        email: 'admin@gmail.com',
        password: '123456',
        fullName: 'Admin',
        phone: '0123456789',
        isAdmin: true
      },
      {
        id: 2,
        email: 'test@example.com',
        password: '123456',
        fullName: 'Test User',
        phone: '0123456789',
        isAdmin: false
      }
    ];
  });

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sneakerhub_users', JSON.stringify(users));
  }, [users]);

  const register = (userData) => {
    const { email, password, fullName, phone } = userData;

    // Kiểm tra email đã tồn tại
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email đã được đăng ký!' };
    }

    // Kiểm tra mật khẩu
    if (password.length < 6) {
      return { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự!' };
    }

    // Tạo tài khoản mới
    const newUser = {
      id: users.length + 1,
      email,
      password,
      fullName,
      phone,
      isAdmin: false
    };

    setUsers([...users, newUser]);
    return { success: true, message: 'Đăng ký thành công! Vui lòng đăng nhập.' };
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      return { success: false, message: 'Email hoặc mật khẩu không chính xác!' };
    }

    setUser({
      id: foundUser.id,
      email: foundUser.email,
      fullName: foundUser.fullName,
      phone: foundUser.phone,
      isAdmin: foundUser.isAdmin || false
    });
    setIsAuthenticated(true);
    return { success: true, message: 'Đăng nhập thành công!' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    users,
    setUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
};

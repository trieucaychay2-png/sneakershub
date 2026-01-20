import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const { user, logout, users, setUsers } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    rating: '',
    discount: '',
    colors: '',
    sizes: ''
  });

  // Redirect if not admin
  if (!user || !user.isAdmin) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
    alert('Bạn đã đăng xuất!');
  };

  const handleDeleteUser = (id) => {
    if (id === user.id) {
      alert('Không thể xóa tài khoản của chính mình!');
      return;
    }
    if (window.confirm('Bạn chắc chắn muốn xóa tài khoản này?')) {
      setUsers(users.filter(u => u.id !== id));
      alert('Xóa tài khoản thành công!');
    }
  };

  const handleToggleAdmin = (id) => {
    const updatedUsers = users.map(u =>
      u.id === id ? { ...u, isAdmin: !u.isAdmin } : u
    );
    setUsers(updatedUsers);
    alert('Cập nhật quyền thành công!');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Vui lòng điền tất cả các trường bắt buộc!');
      return;
    }

    const newProduct = {
      ...formData,
      price: parseInt(formData.price),
      rating: parseFloat(formData.rating) || 5,
      discount: parseInt(formData.discount) || 0,
      colors: formData.colors ? formData.colors.split(',').map(c => c.trim()) : [],
      sizes: formData.sizes ? formData.sizes.split(',').map(s => parseInt(s.trim())) : []
    };

    if (editingProductId) {
      updateProduct(editingProductId, newProduct);
      alert('✅ Cập nhật sản phẩm thành công! Dữ liệu đã được lưu.');
      setEditingProductId(null);
    } else {
      addProduct(newProduct);
      alert('✅ Thêm sản phẩm thành công! Dữ liệu đã được lưu.');
    }

    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      category: '',
      rating: '',
      discount: '',
      colors: '',
      sizes: ''
    });
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      rating: product.rating,
      discount: product.discount,
      colors: product.colors.join(', '),
      sizes: product.sizes.join(', ')
    });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      deleteProduct(id);
      alert('✅ Xóa sản phẩm thành công! Dữ liệu đã được cập nhật.');
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      category: '',
      rating: '',
      discount: '',
      colors: '',
      sizes: ''
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
            <p>SneakerHub</p>
          </div>

          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <i className="fas fa-chart-line"></i> Dashboard
            </button>
            <button
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <i className="fas fa-box"></i> Sản Phẩm
            </button>
            <button
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <i className="fas fa-users"></i> Tài Khoản
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <i className="fas fa-cog"></i> Cài Đặt
            </button>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Đăng Xuất
          </button>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          {/* Header */}
          <header className="admin-header">
            <h1>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'products' && 'Quản Lý Sản Phẩm'}
              {activeTab === 'users' && 'Quản Lý Tài Khoản'}
              {activeTab === 'settings' && 'Cài Đặt'}
            </h1>
            <div className="admin-user">
              <i className="fas fa-user-circle"></i>
              <span>{user?.fullName}</span>
            </div>
          </header>

          {/* Content */}
          <section className="admin-content">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="dashboard">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon users">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-info">
                      <h3>Tổng Tài Khoản</h3>
                      <p className="stat-number">{users.length}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon admins">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div className="stat-info">
                      <h3>Admin</h3>
                      <p className="stat-number">{users.filter(u => u.isAdmin).length}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon customers">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="stat-info">
                      <h3>Khách Hàng</h3>
                      <p className="stat-number">{users.filter(u => !u.isAdmin).length}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon products">
                      <i className="fas fa-box"></i>
                    </div>
                    <div className="stat-info">
                      <h3>Sản Phẩm</h3>
                      <p className="stat-number">{products.length}</p>
                    </div>
                  </div>
                </div>

                <div className="dashboard-info">
                  <h3>Chào mừng, {user?.fullName}! 👋</h3>
                  <p>Đây là admin panel của SneakerHub. Bạn có thể quản lý sản phẩm, tài khoản, và các cài đặt khác từ đây.</p>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="products-section">
                <div className="product-form-container">
                  <h2>{editingProductId ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
                  <form onSubmit={handleAddProduct} className="product-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Tên Sản Phẩm *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Nhập tên sản phẩm"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Giá (VNĐ) *</label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="Nhập giá"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Danh Mục</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                          <option value="">Chọn danh mục</option>
                          <option value="running">Chạy Bộ</option>
                          <option value="sneaker">Sneaker</option>
                          <option value="formal">Giày Tây</option>
                          <option value="casual">Giày Casual</option>
                          <option value="sandal">Dép/Sandal</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Chiết Khấu (%)</label>
                        <input
                          type="number"
                          value={formData.discount}
                          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                          placeholder="Nhập % chiết khấu"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>URL Hình Ảnh</label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Nhập URL hình ảnh"
                      />
                    </div>

                    <div className="form-group">
                      <label>Mô Tả</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Nhập mô tả sản phẩm"
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Đánh Giá (0-5)</label>
                        <input
                          type="number"
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                          placeholder="Nhập đánh giá"
                          min="0"
                          max="5"
                          step="0.1"
                        />
                      </div>
                      <div className="form-group">
                        <label>Màu Sắc (cách nhau bằng dấu ,)</label>
                        <input
                          type="text"
                          value={formData.colors}
                          onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                          placeholder="Đỏ, Đen, Trắng"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Kích Cỡ (cách nhau bằng dấu ,)</label>
                      <input
                        type="text"
                        value={formData.sizes}
                        onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                        placeholder="39, 40, 41, 42, 43"
                      />
                    </div>

                    <div className="form-buttons">
                      <button type="submit" className="submit-btn">
                        {editingProductId ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm'}
                      </button>
                      {editingProductId && (
                        <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                          Hủy
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="products-table-container">
                  <h2>Danh Sách Sản Phẩm ({products.length})</h2>
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Danh Mục</th>
                        <th>Chiết Khấu</th>
                        <th>Đánh Giá</th>
                        <th>Hành Động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price.toLocaleString('vi-VN')} VNĐ</td>
                          <td>{product.category}</td>
                          <td>{product.discount}%</td>
                          <td>⭐ {product.rating}</td>
                          <td>
                            <button
                              className="action-btn edit-btn"
                              onClick={() => handleEditProduct(product)}
                              title="Sửa"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDeleteProduct(product.id)}
                              title="Xóa"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="users-section">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Họ Tên</th>
                      <th>Điện Thoại</th>
                      <th>Quyền</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.email}</td>
                        <td>{u.fullName}</td>
                        <td>{u.phone}</td>
                        <td>
                          <span className={`role-badge ${u.isAdmin ? 'admin' : 'user'}`}>
                            {u.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td>
                          <button
                            className="action-btn edit-btn"
                            onClick={() => handleToggleAdmin(u.id)}
                            title="Chuyển đổi quyền"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDeleteUser(u.id)}
                            title="Xóa"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="settings-section">
                <p>Chức năng cài đặt đang phát triển...</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;

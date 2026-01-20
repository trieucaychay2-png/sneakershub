import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('Bạn đã đăng xuất!');
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <h1>Hồ Sơ Cá Nhân</h1>
        </div>

        <div className="profile-info">
          <div className="info-card">
            <h2>Thông Tin Tài Khoản</h2>
            <div className="info-group">
              <label>Họ và Tên:</label>
              <p>{user?.fullName}</p>
            </div>
            <div className="info-group">
              <label>Email:</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-group">
              <label>Số Điện Thoại:</label>
              <p>{user?.phone}</p>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-logout" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Đăng Xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

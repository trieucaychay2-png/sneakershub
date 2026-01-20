import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <div className="page-header">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
      </div>
      
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Thông Tin Liên Hệ</h2>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div className="contact-details">
                <h4>Địa Chỉ Cửa Hàng</h4>
                <p>123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
                <p className="contact-note">Mở cửa: 8:00 - 22:00 hàng ngày</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div className="contact-details">
                <h4>Điện Thoại</h4>
                <p>(028) 1234 5678</p>
                <p className="contact-note">Hotline: 0901 234 567 (Zalo)</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div className="contact-details">
                <h4>Email</h4>
                <p>info@sneakerhub.vn</p>
                <p className="contact-note">Hỗ trợ kỹ thuật: support@sneakerhub.vn</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div className="contact-details">
                <h4>Giờ Làm Việc</h4>
                <p>Thứ 2 - Thứ 6: 8:00 - 20:00</p>
                <p>Thứ 7 - Chủ nhật: 8:00 - 22:00</p>
              </div>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên *"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại *"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Nội dung tin nhắn *"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="submit-btn">
              <i className="fas fa-paper-plane"></i> Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
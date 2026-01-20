import React, { useState } from 'react';
import './AboutContact.css';

const AboutContact = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Cảm ơn bạn đã đăng ký nhận tin với email: ${email}`);
      setEmail('');
    } else {
      alert('Vui lòng nhập email của bạn!');
    }
  };

  return (
    <footer className="about-contact-section">
      <div className="footer-container">
        {/* Phần Giới Thiệu */}
        <div className="about-section" id="about">
          <div className="section-header">
            <h2 className="section-title">Về SneakerHub</h2>
            <div className="divider"></div>
          </div>
          
          <div className="about-content">
            <p className="about-text">
              <strong>SneakerHub</strong> là điểm đến hàng đầu cho những tín đồ giày dép tại Việt Nam. 
              Với sứ mệnh mang đến những đôi giày chất lượng nhất, chúng tôi cam kết:
            </p>
            
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="feature-content">
                  <h4>Chất Lượng Đảm Bảo 100%</h4>
                  <p>Tất cả sản phẩm đều được kiểm tra chất lượng và xác thực chính hãng trước khi giao đến tay khách hàng</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <div className="feature-content">
                  <h4>Giao Hàng Siêu Tốc</h4>
                  <p>Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ. Giao hàng nội thành trong 2 giờ</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <div className="feature-content">
                  <h4>Hỗ Trợ 24/7</h4>
                  <p>Đội ngũ chăm sóc khách hàng chuyên nghiệp luôn sẵn sàng giải đáp mọi thắc mắc</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-undo-alt"></i>
                </div>
                <div className="feature-content">
                  <h4>Đổi Trả Dễ Dàng</h4>
                  <p>Đổi trả trong 30 ngày nếu sản phẩm không vừa hoặc có vấn đề về chất lượng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Phần Liên Hệ */}
        <div className="contact-section" id="contact">
          <div className="section-header">
            <h2 className="section-title">Liên Hệ Với Chúng Tôi</h2>
            <div className="divider"></div>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-details">
                  <h4>Địa Chỉ Cửa Hàng</h4>
                  <p>123 Đường Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh</p>
                  <p className="contact-note">Có chỗ đậu xe ô tô miễn phí</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h4>Hotline & Đặt Hàng</h4>
                  <p>(028) 1234 5678</p>
                  <p>0901 234 567 (Zalo/Viber)</p>
                  <p className="contact-note">8:00 - 22:00 hàng ngày, kể cả thứ 7 & CN</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h4>Email Liên Hệ</h4>
                  <p>info@sneakerhub.vn</p>
                  <p>support@sneakerhub.vn (Hỗ trợ kỹ thuật)</p>
                  <p className="contact-note">Phản hồi trong vòng 24 giờ làm việc</p>
                </div>
              </div>
            </div>
            
            <div className="newsletter-section">
              <h4>Đăng Ký Nhận Tin Khuyến Mãi</h4>
              <p>Nhận thông báo sớm nhất về sản phẩm mới, khuyến mãi đặc biệt và các sự kiện độc quyền</p>
              
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Nhập email của bạn" 
                  className="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="subscribe-btn">
                  Đăng Ký Ngay <i className="fas fa-paper-plane"></i>
                </button>
              </form>
              <p className="privacy-note">
                <i className="fas fa-lock"></i> Chúng tôi cam kết bảo mật thông tin của bạn
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © 2024 <strong>SneakerHub</strong>. Tất cả các quyền được bảo lưu.<br />
            Giấy chứng nhận ĐKKD số: 0123456789 do Sở KHĐT TP.HCM cấp ngày 01/01/2023
          </p>
          <div className="social-links">
            <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer" title="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://tiktok.com" className="social-link" target="_blank" rel="noopener noreferrer" title="TikTok">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://youtube.com" className="social-link" target="_blank" rel="noopener noreferrer" title="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://zalo.me" className="social-link" target="_blank" rel="noopener noreferrer" title="Zalo">
              <i className="fab fa-facebook-messenger"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AboutContact;
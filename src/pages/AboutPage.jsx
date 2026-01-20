import React from 'react';

const AboutPage = () => {
  return (
    <>
      <div className="page-header">
        <h1>Về SneakerHub</h1>
        <p>Chúng tôi là ai và chúng tôi làm gì</p>
      </div>
      
      <div className="about-page">
        <section className="about-section">
          <h2>Sứ Mệnh Của Chúng Tôi</h2>
          <p>
            SneakerHub được thành lập với sứ mệnh mang đến cho khách hàng Việt Nam 
            những đôi giày chất lượng nhất từ các thương hiệu hàng đầu thế giới.
            Chúng tôi tin rằng một đôi giày tốt không chỉ bảo vệ đôi chân mà còn 
            truyền cảm hứng cho những bước đi tuyệt vời.
          </p>
        </section>
        
        <section className="values-section">
          <h2>Giá Trị Cốt Lõi</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Chất Lượng</h3>
              <p>100% sản phẩm chính hãng, có giấy tờ kiểm định, bảo hành 12 tháng</p>
            </div>
            <div className="value-item">
              <h3>Dịch Vụ</h3>
              <p>Hỗ trợ 24/7, đổi trả trong 30 ngày, giao hàng miễn phí</p>
            </div>
            <div className="value-item">
              <h3>Giá Cả</h3>
              <p>Giá cả cạnh tranh nhất thị trường với nhiều chương trình khuyến mãi</p>
            </div>
            <div className="value-item">
              <h3>Trải Nghiệm</h3>
              <p>Mua sắm dễ dàng, thanh toán an toàn, giao hàng nhanh chóng</p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Đội Ngũ Của Chúng Tôi</h2>
          <p>
            Với đội ngũ chuyên gia giày có hơn 10 năm kinh nghiệm, chúng tôi 
            luôn sẵn sàng tư vấn giúp bạn lựa chọn đôi giày phù hợp nhất. 
            Từ những đôi giày chạy bộ chuyên nghiệp đến sneaker thời trang, 
            chúng tôi hiểu rõ từng sản phẩm và nhu cầu của khách hàng.
          </p>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
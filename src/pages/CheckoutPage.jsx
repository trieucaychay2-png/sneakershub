import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    note: ''
  });
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(500000);
  const [showVietQR, setShowVietQR] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);

  // Danh sách tài khoản ngân hàng (3 tài khoản)
  const bankAccounts = [
    {
      id: 1,
      bankName: "MB Bank (Ngân hàng TMCP Quân đội)",
      accountNumber: "20202222032006",
      accountHolder: "PHUNG VI THAI",
      qrCodeUrl: "https://img.vietqr.io/image/MB-20202222032006-compact.png",
      bankCode: "MB"
    },
    {
      id: 2,
      bankName: "MB Bank (Ngân hàng TMCP Quân đội)",
      accountNumber: "0915934637",
      accountHolder: "A VI TRIEU",
      qrCodeUrl: "https://img.vietqr.io/image/MB-0915934637-compact.png",
      bankCode: "MB"
    },
    {
      id: 3,
      bankName: "MB Bank (Ngân hàng TMCP Quân đội)",
      accountNumber: "0935814328",
      accountHolder: "PHAM NGUYEN ANH TUAN",
      qrCodeUrl: "https://img.vietqr.io/image/MB-0935814328-compact.png",
      bankCode: "MB"
    }
  ];

  // Dữ liệu sản phẩm mẫu
  const sampleProducts = [
    {
      id: 1,
      name: "Giày Chạy Bộ Nike Air Max 270 React",
      price: 2450000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60",
      category: "running"
    },
    {
      id: 2,
      name: "Giày Sneaker Adidas Ultraboost 22",
      price: 3200000,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60",
      category: "sneaker"
    },
    {
      id: 3,
      name: "Giày Tây Da Bò Oxford Cao Cấp",
      price: 1850000,
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60",
      category: "formal"
    },
    {
      id: 4,
      name: "Giày Thể Thao Puma RS-X Turbo",
      price: 1890000,
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60",
      category: "sneaker"
    }
  ];

  // Khởi tạo giỏ hàng
  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
    } else {
      setCartItems(sampleProducts.slice(0, 2).map(item => ({...item, quantity: 1})));
    }
    
    // Random chọn tài khoản ngân hàng khi component mount
    selectRandomBankAccount();
  }, [location]);

  // Hàm random chọn tài khoản ngân hàng
  const selectRandomBankAccount = () => {
    const randomIndex = Math.floor(Math.random() * bankAccounts.length);
    setSelectedBankAccount(bankAccounts[randomIndex]);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  // Tính tổng sau giảm giá
  const calculateFinalTotal = () => {
    const total = calculateTotal();
    return total - discount;
  };

  // Tính tổng số sản phẩm
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // Thêm sản phẩm mới
  const handleAddProduct = () => {
    const availableProducts = sampleProducts.filter(product => 
      !cartItems.some(item => item.id === product.id)
    );
    
    if (availableProducts.length > 0) {
      const newProduct = {
        ...availableProducts[0],
        quantity: 1
      };
      setCartItems([...cartItems, newProduct]);
      alert(`✅ Đã thêm sản phẩm: ${newProduct.name}`);
    } else {
      alert('🎉 Đã thêm tất cả sản phẩm mẫu!');
    }
  };

  // Xóa sản phẩm
  const handleRemoveItem = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  // Cập nhật số lượng
  const handleUpdateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = (item.quantity || 1) + delta;
        return {
          ...item,
          quantity: newQuantity < 1 ? 1 : newQuantity
        };
      }
      return item;
    }));
  };

  // Toggle giảm giá
  const toggleDiscount = () => {
    const newDiscount = discount === 500000 ? 0 : 500000;
    setDiscount(newDiscount);
    alert(newDiscount > 0 ? '🎉 Đã áp dụng giảm giá 500,000đ' : '❌ Đã hủy giảm giá');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Hàm in QR code trực tiếp
  const printQRCodeDirectly = () => {
    if (!selectedBankAccount) {
      selectRandomBankAccount();
    }
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Mã QR Thanh Toán - SneakerHub</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            text-align: center; 
            padding: 30px; 
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }
          .print-container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .logo { 
            font-size: 28px; 
            font-weight: bold; 
            color: #2c3e50; 
            margin-bottom: 10px;
            padding-bottom: 15px;
            border-bottom: 2px solid #3498db;
          }
          .subtitle {
            color: #7f8c8d;
            margin-bottom: 25px;
          }
          .qr-code { 
            max-width: 300px; 
            margin: 25px auto; 
            padding: 15px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            border: 2px solid #3498db;
          }
          .qr-code img {
            width: 100%;
            border-radius: 5px;
          }
          .bank-info { 
            text-align: left; 
            margin: 25px 0; 
            padding: 25px; 
            border: 2px solid #ecf0f1; 
            border-radius: 12px; 
            background: #f8f9fa;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          }
          .info-item { 
            margin: 12px 0; 
            display: flex; 
            align-items: center;
            padding-bottom: 8px;
            border-bottom: 1px dashed #ddd;
          }
          .info-label { 
            font-weight: 600; 
            color: #2c3e50;
            min-width: 160px; 
            display: flex;
            align-items: center;
          }
          .info-label i {
            margin-right: 8px;
            color: #3498db;
            width: 20px;
          }
          .info-value {
            color: #34495e;
            font-weight: 500;
            flex: 1;
          }
          .highlight {
            background: #fff3cd;
            padding: 2px 8px;
            border-radius: 4px;
            color: #856404;
          }
          .amount { 
            color: #e74c3c; 
            font-weight: bold; 
            font-size: 22px; 
            background: #ffeaea;
            padding: 5px 15px;
            border-radius: 8px;
            display: inline-block;
          }
          .note { 
            font-style: italic; 
            color: #666; 
            margin-top: 25px; 
            font-size: 14px; 
            padding: 15px;
            background: #f1f8ff;
            border-radius: 8px;
            border-left: 4px solid #3498db;
          }
          .step-item {
            margin: 8px 0;
            display: flex;
            align-items: center;
          }
          .step-number {
            background: #3498db;
            color: white;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            font-size: 14px;
            font-weight: bold;
          }
          .customer-info {
            margin: 15px 0;
            padding: 15px;
            background: #e8f4fc;
            border-radius: 8px;
            border-left: 4px solid #3498db;
          }
          .account-badge {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            margin-left: 10px;
          }
          @media print {
            body { background: white; }
            .print-container { box-shadow: none; }
            .no-print { display: none; }
          }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
      </head>
      <body>
        <div class="print-container">
          <div class="logo">👟 SNEAKERHUB</div>
          <div class="subtitle">Mã QR Thanh Toán Đơn Hàng</div>
          
          <div class="customer-info">
            <p><strong>Thông tin khách hàng:</strong></p>
            <p>👤 ${orderInfo.name || 'Khách hàng'}</p>
            <p>📞 ${orderInfo.phone || 'Chưa cập nhật'}</p>
            <p>🏠 ${orderInfo.address || 'Chưa cập nhật'}</p>
          </div>
          
          <div class="bank-info">
            <div class="info-item">
              <span class="info-label"><i class="fas fa-university"></i> Ngân hàng:</span>
              <span class="info-value">${selectedBankAccount.bankName} <span class="account-badge">Tài khoản ${selectedBankAccount.id}</span></span>
            </div>
            <div class="info-item">
              <span class="info-label"><i class="fas fa-credit-card"></i> Số tài khoản:</span>
              <span class="info-value highlight">${selectedBankAccount.accountNumber}</span>
            </div>
            <div class="info-item">
              <span class="info-label"><i class="fas fa-user"></i> Chủ tài khoản:</span>
              <span class="info-value"><strong>${selectedBankAccount.accountHolder}</strong></span>
            </div>
            <div class="info-item">
              <span class="info-label"><i class="fas fa-money-bill-wave"></i> Số tiền:</span>
              <span class="info-value"><span class="amount">${formatPrice(calculateFinalTotal())}</span></span>
            </div>
            <div class="info-item">
              <span class="info-label"><i class="fas fa-file-alt"></i> Nội dung:</span>
              <span class="info-value">Thanh toán đơn hàng SneakerHub</span>
            </div>
            <div class="info-item">
              <span class="info-label"><i class="fas fa-shopping-cart"></i> Tổng sản phẩm:</span>
              <span class="info-value">${getTotalItems()} sản phẩm</span>
            </div>
          </div>
          
          <div class="qr-code">
            <img src="${selectedBankAccount.qrCodeUrl}" alt="VietQR Code">
            <p style="margin-top: 10px; font-size: 12px; color: #666;">Quét mã QR để thanh toán nhanh</p>
          </div>
          
          <div class="note">
            <p><i class="fas fa-check-circle"></i> <strong>Hướng dẫn thanh toán:</strong></p>
            <div class="step-item"><span class="step-number">1</span> Mở ứng dụng ngân hàng trên điện thoại</div>
            <div class="step-item"><span class="step-number">2</span> Chọn tính năng "Quét mã QR"</div>
            <div class="step-item"><span class="step-number">3</span> Hướng camera vào mã QR bên trên</div>
            <div class="step-item"><span class="step-number">4</span> Kiểm tra và xác nhận thanh toán</div>
            <p style="margin-top: 15px;"><i class="fas fa-info-circle"></i> Mã QR tuân thủ tiêu chuẩn VietQR - Chuẩn QR code quốc gia Việt Nam</p>
            <p><i class="fas fa-calendar-alt"></i> Ngày in: ${new Date().toLocaleString('vi-VN')}</p>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
            // Tự động đóng cửa sổ in sau 3 giây
            setTimeout(function() {
              window.close();
            }, 3000);
          }
        </script>
      </body>
      </html>
    `);
  };

  const handleSubmitOrder = () => {
    if (!orderInfo.name || !orderInfo.phone || !orderInfo.address) {
      alert('⚠️ Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    if (paymentMethod === 'qr') {
      // Random chọn tài khoản ngân hàng mới mỗi lần thanh toán
      selectRandomBankAccount();
      
      // Nếu thanh toán bằng QR, in QR code ngay lập tức
      printQRCodeDirectly();
      
      // Hiển thị thông báo
      alert(`✅ Đã mở cửa sổ in mã QR!\n\n💳 Thanh toán: QR Code\n🏦 Ngân hàng: ${selectedBankAccount.bankName}\n👤 Chủ TK: ${selectedBankAccount.accountHolder}\n💰 Số tiền: ${formatPrice(calculateFinalTotal())}\n\nVui lòng quét mã QR trong cửa sổ in để thanh toán.`);
      
      // Sau khi in QR, vẫn có thể quay lại trang
      setShowVietQR(true);
      return;
    } else if (paymentMethod === 'cash') {
      // Nếu thanh toán COD
      const orderId = 'SN' + Date.now().toString().slice(-6);
      alert(`✅ Đặt hàng thành công!\n\n📦 Mã đơn hàng: ${orderId}\n💳 Thanh toán: Tiền mặt khi nhận hàng\n👤 Khách hàng: ${orderInfo.name}\n📞 SĐT: ${orderInfo.phone}\n🏠 Địa chỉ: ${orderInfo.address}\n💰 Tổng thanh toán: ${formatPrice(calculateFinalTotal())}\n\nCảm ơn bạn đã mua hàng!`);
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const handleCopyBankInfo = () => {
    if (!selectedBankAccount) {
      selectRandomBankAccount();
    }
    
    const bankInfo = `🏦 THÔNG TIN CHUYỂN KHOẢN VIETQR 🏦
══════════════════════════════════
📌 Ngân hàng: ${selectedBankAccount.bankName}
💰 Số tài khoản: ${selectedBankAccount.accountNumber}
👤 Chủ tài khoản: ${selectedBankAccount.accountHolder}
💵 Số tiền: ${formatPrice(calculateFinalTotal())}
📝 Nội dung: Thanh toán đơn hàng SneakerHub
📦 Tổng sản phẩm: ${getTotalItems()} sản phẩm
📅 Ngày: ${new Date().toLocaleDateString('vi-VN')}

✨ Quét mã QR để thanh toán nhanh chóng!
══════════════════════════════════`;
    
    navigator.clipboard.writeText(bankInfo).then(() => {
      alert('✅ Đã sao chép thông tin ngân hàng vào clipboard!');
    }).catch(err => {
      const textArea = document.createElement('textarea');
      textArea.value = bankInfo;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('✅ Đã sao chép thông tin ngân hàng!');
    });
  };

  const handlePrintQR = () => {
    // Random chọn tài khoản mới khi in lại
    selectRandomBankAccount();
    printQRCodeDirectly();
  };

  const handleDownloadQR = () => {
    if (!selectedBankAccount) {
      selectRandomBankAccount();
    }
    
    const link = document.createElement('a');
    link.href = selectedBankAccount.qrCodeUrl;
    link.download = `VietQR-SneakerHub-${selectedBankAccount.accountNumber}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert(`✅ Đã tải QR Code của tài khoản ${selectedBankAccount.accountHolder} về máy!`);
  };

  // Hàm chọn tài khoản khác
  const handleSelectDifferentAccount = () => {
    selectRandomBankAccount();
    alert(`🔄 Đã chuyển sang tài khoản:\n\n🏦 ${selectedBankAccount.bankName}\n💰 ${selectedBankAccount.accountNumber}\n👤 ${selectedBankAccount.accountHolder}`);
  };

  return (
    <>
      <div className="page-header">
        <h1><i className="fas fa-cash-register"></i> Thanh Toán</h1>
        <p className="subtitle">Hoàn tất đơn hàng của bạn một cách dễ dàng</p>
      </div>
      
      <div className="checkout-page container">
        <div className="checkout-container">
          <div className="order-info">
            <div className="info-header">
              <h2><i className="fas fa-receipt"></i> Thông Tin Đơn Hàng</h2>
              <div className="order-stats">
                <span className="stat-item">
                  <i className="fas fa-box"></i> {getTotalItems()} sản phẩm
                </span>
                <span className="stat-item">
                  <i className="fas fa-clock"></i> Xử lý ngay
                </span>
              </div>
            </div>
            
            <div className="order-summary">
              <div className="order-actions-header">
                <h3><i className="fas fa-shopping-cart"></i> Giỏ hàng của bạn</h3>
                <button className="add-product-btn" onClick={handleAddProduct}>
                  <i className="fas fa-plus-circle"></i> Thêm sản phẩm mới
                </button>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="empty-cart-message">
                  <i className="fas fa-shopping-cart fa-3x"></i>
                  <p>Giỏ hàng trống. Vui lòng thêm sản phẩm!</p>
                </div>
              ) : (
                <>
                  {cartItems.map(item => (
                    <div className="order-item" key={item.id}>
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                        <span className="item-badge">{item.category}</span>
                      </div>
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="price">Đơn giá: <strong>{formatPrice(item.price)}</strong></p>
                        
                        <div className="quantity-control">
                          <button 
                            className="qty-btn minus" 
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="quantity">{item.quantity || 1}</span>
                          <button 
                            className="qty-btn plus"
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                          <button 
                            className="remove-item-btn" 
                            onClick={() => handleRemoveItem(item.id)}
                            title="Xóa sản phẩm"
                          >
                            <i className="fas fa-trash-alt"></i> Xóa
                          </button>
                        </div>
                      </div>
                      <div className="item-total">
                        <span className="total-amount">{formatPrice(item.price * (item.quantity || 1))}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
              
              <div className="order-totals">
                <div className="total-row">
                  <span><i className="fas fa-calculator"></i> Tạm tính ({getTotalItems()} sản phẩm):</span>
                  <span className="subtotal">{formatPrice(calculateTotal())}</span>
                </div>
                <div className="total-row">
                  <span><i className="fas fa-shipping-fast"></i> Phí vận chuyển:</span>
                  <span className="free-badge"><i className="fas fa-check-circle"></i> MIỄN PHÍ</span>
                </div>
                <div className="total-row discount-row">
                  <span><i className="fas fa-tag"></i> Giảm giá:</span>
                  <div className="discount-control">
                    <span className={`discount-amount ${discount > 0 ? 'active' : ''}`}>
                      <i className="fas fa-gift"></i> -{formatPrice(discount)}
                    </span>
                    <button 
                      className={`toggle-discount-btn ${discount > 0 ? 'active' : ''}`}
                      onClick={toggleDiscount}
                    >
                      {discount > 0 ? (
                        <>
                          <i className="fas fa-times"></i> Hủy giảm giá
                        </>
                      ) : (
                        <>
                          <i className="fas fa-gift"></i> Áp dụng giảm giá
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="total-row grand-total">
                  <span><i className="fas fa-file-invoice-dollar"></i> Tổng thanh toán:</span>
                  <span className="final-total">{formatPrice(calculateFinalTotal())}</span>
                </div>
                
                {discount > 0 && (
                  <div className="savings-note">
                    <i className="fas fa-piggy-bank"></i>
                    <span>Bạn đã tiết kiệm được <strong>{formatPrice(discount)}</strong> với mã giảm giá</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="checkout-form">
            {!showVietQR ? (
              <>
                <div className="form-section">
                  <h2><i className="fas fa-truck"></i> Thông Tin Giao Hàng</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label><i className="fas fa-user"></i> Họ và tên *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Nhập họ và tên đầy đủ"
                        value={orderInfo.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label><i className="fas fa-phone"></i> Số điện thoại *</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        value={orderInfo.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label><i className="fas fa-envelope"></i> Email (nhận hóa đơn)</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        value={orderInfo.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label><i className="fas fa-home"></i> Địa chỉ giao hàng *</label>
                      <textarea
                        name="address"
                        placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                        value={orderInfo.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label><i className="fas fa-sticky-note"></i> Ghi chú cho người giao hàng</label>
                      <textarea
                        name="note"
                        placeholder="Hướng dẫn đặc biệt, giờ giao hàng, v.v..."
                        value={orderInfo.note}
                        onChange={handleInputChange}
                        rows="2"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-section payment-section">
                  <h2><i className="fas fa-credit-card"></i> Phương Thức Thanh Toán</h2>
                  
                  <div className="payment-options">
                    <div className={`payment-option ${paymentMethod === 'qr' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        id="qr"
                        name="payment"
                        checked={paymentMethod === 'qr'}
                        onChange={() => setPaymentMethod('qr')}
                      />
                      <label htmlFor="qr">
                        <div className="option-icon qr-icon">
                          <i className="fas fa-qrcode"></i>
                        </div>
                        <div className="option-details">
                          <span className="option-title">Chuyển khoản QR VietQR</span>
                          <span className="option-description">
                            <i className="fas fa-random"></i> Hệ thống sẽ random 1 trong 3 tài khoản ngân hàng
                          </span>
                        </div>
                      </label>
                    </div>
                    
                    <div className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        id="cash"
                        name="payment"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                      />
                      <label htmlFor="cash">
                        <div className="option-icon cash-icon">
                          <i className="fas fa-money-bill-wave"></i>
                        </div>
                        <div className="option-details">
                          <span className="option-title">Tiền mặt khi nhận hàng (COD)</span>
                          <span className="option-description">Thanh toán khi nhận được sản phẩm</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="order-actions">
                    <button className="back-btn" onClick={handleBackToCart}>
                      <i className="fas fa-arrow-left"></i> Quay lại giỏ hàng
                    </button>
                    <button className="continue-btn" onClick={handleContinueShopping}>
                      <i className="fas fa-shopping-bag"></i> Tiếp tục mua sắm
                    </button>
                    <button 
                      className="submit-order-btn" 
                      onClick={handleSubmitOrder}
                      disabled={cartItems.length === 0}
                    >
                      {paymentMethod === 'qr' ? (
                        <>
                          <i className="fas fa-print"></i> In QR & Thanh toán
                        </>
                      ) : (
                        <>
                          <i className="fas fa-lock"></i> Xác nhận đặt hàng
                        </>
                      )}
                    </button>
                  </div>
                  
                  {paymentMethod === 'qr' && (
                    <div className="qr-note">
                      <i className="fas fa-info-circle"></i>
                      <span>Hệ thống sẽ random chọn 1 trong 3 tài khoản: PHUNG VI THAI, A VI TRIEU, PHAM NGUYEN ANH TUAN</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="form-section vietqr-section">
                <div className="vietqr-header">
                  <h2><i className="fas fa-qrcode"></i> Thanh Toán Qua VietQR</h2>
                  <p className="vietqr-description">
                    <i className="fas fa-random"></i> Hệ thống đã random chọn tài khoản ngân hàng cho bạn
                  </p>
                </div>
                
                <div className="vietqr-container">
                  {selectedBankAccount && (
                    <>
                      <div className="qr-success-message">
                        <i className="fas fa-check-circle fa-3x"></i>
                        <h3>✅ Mã QR đã được in thành công!</h3>
                        <p>Tài khoản được chọn: <strong>{selectedBankAccount.accountHolder}</strong></p>
                        <button 
                          className="change-account-btn"
                          onClick={handleSelectDifferentAccount}
                        >
                          <i className="fas fa-random"></i> Chọn tài khoản khác
                        </button>
                      </div>
                      
                      <div className="qr-code-display">
                        <div className="qr-code-wrapper">
                          <div className="qr-frame">
                            <img 
                              src={selectedBankAccount.qrCodeUrl} 
                              alt="VietQR Code MB Bank" 
                              className="qr-code"
                            />
                            <div className="qr-overlay">
                              <div className="qr-bank-logo">
                                <i className="fas fa-university"></i>
                                <span>MB Bank</span>
                              </div>
                              <div className="qr-amount">
                                <i className="fas fa-money-bill-wave"></i>
                                <span>{formatPrice(calculateFinalTotal())}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="qr-scan-guide">
                          <i className="fas fa-mobile-alt"></i>
                          <p>Mở ứng dụng ngân hàng, chọn <strong>"Quét mã QR"</strong> và hướng camera vào mã QR bên trên</p>
                        </div>
                      </div>
                      
                      <div className="bank-info-card">
                        <div className="card-header">
                          <i className="fas fa-info-circle"></i>
                          <h4>Thông Tin Chuyển Khoản Chuẩn VietQR</h4>
                          <span className="account-tag">Tài khoản #{selectedBankAccount.id}</span>
                        </div>
                        <div className="bank-details-grid">
                          <div className="bank-detail">
                            <div className="detail-header">
                              <i className="fas fa-university"></i>
                              <span>Ngân hàng</span>
                            </div>
                            <div className="detail-value">
                              {selectedBankAccount.bankName}
                            </div>
                          </div>
                          <div className="bank-detail">
                            <div className="detail-header">
                              <i className="fas fa-credit-card"></i>
                              <span>Số tài khoản</span>
                            </div>
                            <div className="detail-value highlight">
                              {selectedBankAccount.accountNumber}
                            </div>
                          </div>
                          <div className="bank-detail">
                            <div className="detail-header">
                              <i className="fas fa-user-tie"></i>
                              <span>Chủ tài khoản</span>
                            </div>
                            <div className="detail-value owner">
                              <strong>{selectedBankAccount.accountHolder}</strong>
                            </div>
                          </div>
                          <div className="bank-detail">
                            <div className="detail-header">
                              <i className="fas fa-money-bill-wave"></i>
                              <span>Số tiền</span>
                            </div>
                            <div className="detail-value amount">
                              {formatPrice(calculateFinalTotal())}
                            </div>
                          </div>
                          <div className="bank-detail">
                            <div className="detail-header">
                              <i className="fas fa-file-alt"></i>
                              <span>Nội dung</span>
                            </div>
                            <div className="detail-value">
                              Thanh toán đơn hàng SneakerHub
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="all-accounts-info">
                        <h4><i className="fas fa-list"></i> Danh sách tất cả tài khoản hỗ trợ:</h4>
                        <div className="accounts-list">
                          {bankAccounts.map(account => (
                            <div 
                              key={account.id} 
                              className={`account-item ${selectedBankAccount.id === account.id ? 'active' : ''}`}
                            >
                              <div className="account-number">{account.accountNumber}</div>
                              <div className="account-holder">{account.accountHolder}</div>
                              <div className="account-bank">{account.bankName}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="qr-actions">
                    <button className="copy-btn" onClick={handleCopyBankInfo}>
                      <i className="fas fa-copy"></i> Sao chép thông tin
                    </button>
                    <button className="download-btn" onClick={handleDownloadQR}>
                      <i className="fas fa-download"></i> Tải QR Code
                    </button>
                    <button className="print-btn" onClick={handlePrintQR}>
                      <i className="fas fa-print"></i> In lại mã QR
                    </button>
                  </div>
                  
                  <div className="payment-steps">
                    <h4><i className="fas fa-graduation-cap"></i> Các bước thanh toán:</h4>
                    <ol className="steps-list">
                      <li><strong>Bước 1:</strong> Lấy bản in mã QR vừa được in</li>
                      <li><strong>Bước 2:</strong> Mở ứng dụng ngân hàng trên điện thoại</li>
                      <li><strong>Bước 3:</strong> Chọn "Quét mã QR" và hướng camera vào mã QR đã in</li>
                      <li><strong>Bước 4:</strong> Kiểm tra thông tin và xác nhận thanh toán</li>
                      <li><strong>Bước 5:</strong> Lưu biên lai điện tử để đối chiếu</li>
                    </ol>
                  </div>
                  
                  <div className="order-actions vietqr-actions">
                    <button className="back-to-form-btn" onClick={() => setShowVietQR(false)}>
                      <i className="fas fa-arrow-left"></i> Quay lại
                    </button>
                    <button className="confirm-payment-btn" onClick={() => {
                      alert(`✅ Cảm ơn bạn! Đơn hàng sẽ được xử lý sau khi xác nhận thanh toán.\n\n💳 Tài khoản: ${selectedBankAccount.accountHolder}\n💰 Số tiền: ${formatPrice(calculateFinalTotal())}\n📞 Liên hệ: ${orderInfo.phone}\n\nChúng tôi sẽ liên hệ với bạn trong vòng 24h.`);
                      setTimeout(() => {
                        navigate('/');
                      }, 3000);
                    }}>
                      <i className="fas fa-check-circle"></i> Tôi đã thanh toán
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="security-guarantee">
              <div className="guarantee-item">
                <i className="fas fa-shield-alt"></i>
                <span>Bảo mật 100%</span>
              </div>
              <div className="guarantee-item">
                <i className="fas fa-truck-fast"></i>
                <span>Giao hàng nhanh</span>
              </div>
              <div className="guarantee-item">
                <i className="fas fa-headset"></i>
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
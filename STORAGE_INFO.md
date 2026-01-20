# 💾 Thông Tin Lưu Trữ Dữ Liệu - SneakerHub

## 🎯 Tổng Quan
Ứng dụng SneakerHub sử dụng **localStorage** của trình duyệt để lưu trữ tất cả dữ liệu. Điều này có nghĩa là:
- ✅ Dữ liệu được **lưu tự động** khi bạn thực hiện bất kỳ thay đổi nào
- ✅ Dữ liệu **không bị mất** khi refresh trang
- ✅ Dữ liệu **tồn tại** cho đến khi bạn xóa cache/history

---

## 📊 Dữ Liệu Được Lưu

### 1. **Sản Phẩm (Products)** 🛞
**Key:** `sneakerhub_products`
```javascript
// Bao gồm:
- ID sản phẩm
- Tên sản phẩm
- Giá tiền
- Hình ảnh
- Mô tả
- Danh mục
- Đánh giá
- Giảm giá
- Màu sắc
- Kích thước
```

**Lưu khi nào:**
- ➕ Thêm sản phẩm mới ở Admin Panel
- ✏️ Cập nhật thông tin sản phẩm ở Admin Panel
- ❌ Xóa sản phẩm ở Admin Panel
- 🔄 Tự động lưu ngay sau mỗi thay đổi

---

### 2. **Người Dùng (Users)** 👥
**Key:** `sneakerhub_users`
```javascript
// Bao gồm:
- ID người dùng
- Email
- Mật khẩu
- Tên đầy đủ
- Số điện thoại
- Quyền Admin (true/false)
```

**Lưu khi nào:**
- 📝 Người dùng đăng ký tài khoản mới
- 👤 Admin thay đổi quyền người dùng
- ❌ Admin xóa người dùng
- 🔄 Tự động lưu sau mỗi thay đổi

---

### 3. **Giỏ Hàng (Cart)** 🛒
**Key:** `sneakerhub_cart_count`
```javascript
// Bao gồm:
- Số lượng sản phẩm trong giỏ hàng
```

**Lưu khi nào:**
- ➕ Thêm sản phẩm vào giỏ hàng
- ➖ Xóa sản phẩm khỏi giỏ hàng
- 🔄 Tự động lưu sau mỗi thay đổi

---

### 4. **Wishlist (Danh Sách Yêu Thích)** ❤️
**Key:** `sneakerhub_wishlist`
```javascript
// Bao gồm:
- Mảng ID của các sản phẩm yêu thích
```

**Lưu khi nào:**
- ❤️ Người dùng thêm sản phẩm vào wishlist
- 🖤 Người dùng xóa sản phẩm khỏi wishlist
- 🔄 Tự động lưu sau mỗi thay đổi

---

## 🔄 Cách Hoạt Động

### Flow Thêm Sản Phẩm:
```
1. Admin nhập thông tin sản phẩm
   ↓
2. Click "Thêm Sản Phẩm"
   ↓
3. Hệ thống gọi addProduct()
   ↓
4. setProducts() được gọi
   ↓
5. useEffect tự động lưu vào localStorage
   ↓
6. ✅ Lưu thành công!
```

### Flow Cập Nhật Sản Phẩm:
```
1. Admin chọn sản phẩm để sửa
   ↓
2. Thay đổi thông tin
   ↓
3. Click "Cập Nhật"
   ↓
4. Hệ thống gọi updateProduct()
   ↓
5. setProducts() được gọi
   ↓
6. useEffect tự động lưu vào localStorage
   ↓
7. ✅ Cập nhật thành công!
```

### Flow Xóa Sản Phẩm:
```
1. Admin click nút xóa
   ↓
2. Xác nhận xóa
   ↓
3. Hệ thống gọi deleteProduct()
   ↓
4. setProducts() được gọi
   ↓
5. useEffect tự động lưu vào localStorage
   ↓
6. ✅ Xóa thành công!
```

---

## 🖥️ Xem Dữ Liệu Trong Browser

### Chrome/Edge:
1. Mở DevTools: **F12** hoặc **Ctrl+Shift+I**
2. Vào tab **Application**
3. Click **Local Storage** 
4. Chọn domain của website
5. Xem các key:
   - `sneakerhub_products`
   - `sneakerhub_users`
   - `sneakerhub_cart_count`
   - `sneakerhub_wishlist`

### Firefox:
1. Mở DevTools: **F12**
2. Vào tab **Storage**
3. Click **Local Storage**
4. Chọn domain của website
5. Xem các key

---

## ⚠️ Lưu Ý Quan Trọng

### Khi Dữ Liệu Bị Xóa:
- 🗑️ **Clear Cache/Cookies**: Dữ liệu sẽ bị xóa
- 🔄 **Khởi động lại**: Sẽ load default products
- 📱 **Đổi thiết bị**: Dữ liệu ở thiết bị khác sẽ không có

### Bảo Mật:
- ⚠️ localStorage lưu **plaintext** (có thể nhìn được trong DevTools)
- ⚠️ **Không nên** lưu thông tin nhạy cảm như mật khẩu thực
- 💡 Đây là demo, production cần backend server

---

## 🔧 Cách Kiểm Tra Hoạt Động

### Test 1: Thêm Sản Phẩm
1. Vào Admin Panel
2. Thêm sản phẩm mới
3. Mở DevTools → Local Storage
4. Xem `sneakerhub_products` - sản phẩm mới sẽ có trong đó
5. Refresh trang - sản phẩm vẫn ở đó ✅

### Test 2: Cập Nhật Sản Phẩm
1. Vào Admin Panel
2. Chỉnh sửa sản phẩm
3. Mở DevTools → Local Storage
4. Xem `sneakerhub_products` - thay đổi sẽ có trong đó
5. Refresh trang - thay đổi vẫn được giữ ✅

### Test 3: Xóa Sản Phẩm
1. Vào Admin Panel
2. Xóa sản phẩm
3. Mở DevTools → Local Storage
4. Xem `sneakerhub_products` - sản phẩm không còn
5. Refresh trang - sản phẩm vẫn bị xóa ✅

### Test 4: Giỏ Hàng
1. Thêm sản phẩm vào giỏ hàng
2. Mở DevTools → Local Storage
3. Xem `sneakerhub_cart_count` - số lượng được cập nhật
4. Refresh trang - số lượng vẫn ở đó ✅

---

## 📝 Tóm Tắt

| Dữ Liệu | Key | Tự Động Lưu? | Persist? |
|---------|-----|--------------|----------|
| Sản phẩm | sneakerhub_products | ✅ Yes | ✅ Yes |
| Người dùng | sneakerhub_users | ✅ Yes | ✅ Yes |
| Giỏ hàng | sneakerhub_cart_count | ✅ Yes | ✅ Yes |
| Wishlist | sneakerhub_wishlist | ✅ Yes | ✅ Yes |

---

## 🎉 Kết Luận

**Tất cả dữ liệu trong SneakerHub được lưu tự động và sẽ tồn tại cho đến khi bạn:**
- Xóa localStorage của website
- Clear cache/cookies trình duyệt
- Xóa lịch sử duyệt web

**Không cần click nút "Lưu" hay "Save" - mọi thứ đã được lưu tự động!** 🚀

# 🎯 Hệ Thống Quản Lý Dữ Liệu Tổng Thể - SneakerHub

## 📊 Tổng Quan

Hệ thống SneakerHub sử dụng **Centralized Data Management** - tất cả dữ liệu được quản lý từ **một nơi duy nhất** trong Admin Panel và tự động lưu trữ trong localStorage.

---

## 🗂️ Cấu Trúc Quản Lý Dữ Liệu

### Architecture:
```
┌─────────────────────────────────────────────┐
│          Admin Panel (Quản Lý)              │
│  ┌───────────────────────────────────────┐  │
│  │  Dashboard | Products | Users | ...   │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│        DataContext & AuthContext            │
│  (Trung tâm quản lý logic dữ liệu)         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│    Browser localStorage (Lưu trữ)          │
│  ├─ sneakerhub_products                    │
│  ├─ sneakerhub_users                       │
│  ├─ sneakerhub_cart_count                  │
│  └─ sneakerhub_wishlist                    │
└─────────────────────────────────────────────┘
```

---

## 📦 Dữ Liệu Được Quản Lý (Toàn Bộ)

### 1️⃣ **SẢN PHẨM (Products)** 🛞
**Tổng số: 12 sản phẩm**

**Được quản lý tại:** Admin Panel → Products Tab

**Dữ liệu lưu:**
- ID sản phẩm
- Tên sản phẩm
- Giá tiền
- Hình ảnh
- Mô tả chi tiết
- Danh mục (running, sneaker, formal, casual)
- Đánh giá (4.5 - 4.9 sao)
- % Giảm giá (5% - 25%)
- Màu sắc
- Kích thước

**Các thao tác:**
- ✅ **Thêm sản phẩm mới** → Click "Thêm Sản Phẩm" → Điền form
- ✅ **Chỉnh sửa sản phẩm** → Click "Edit" → Sửa thông tin → Lưu
- ✅ **Xóa sản phẩm** → Click "Delete" → Xác nhận
- ✅ **Tất cả thay đổi tự động lưu** vào localStorage

**Key localStorage:** `sneakerhub_products`

---

### 2️⃣ **NGƯỜI DÙNG (Users)** 👥
**Tổng số: 2 users (mặc định)**

**Được quản lý tại:** Admin Panel → Users Tab

**Dữ liệu lưu:**
- ID người dùng
- Email
- Mật khẩu
- Tên đầy đủ
- Số điện thoại
- Quyền Admin (true/false)

**Các thao tác:**
- ✅ **Xem danh sách người dùng** → Users Tab
- ✅ **Thay đổi quyền Admin** → Click toggle
- ✅ **Xóa người dùng** → Click delete
- ✅ **Người dùng mới tự động tạo** khi đăng ký
- ✅ **Tất cả thay đổi tự động lưu**

**Default Users:**
```
Email: admin@gmail.com
Password: 123456
Role: Admin ✅

Email: test@example.com
Password: 123456
Role: User
```

**Key localStorage:** `sneakerhub_users`

---

### 3️⃣ **GIỎ HÀNG (Cart)** 🛒
**Được quản lý tại:** Header & Cart Page

**Dữ liệu lưu:**
- Số lượng sản phẩm
- Thêm/xóa sản phẩm
- Cập nhật số lượng

**Các thao tác:**
- ✅ **Thêm vào giỏ** → Click "Thêm Giỏ Hàng"
- ✅ **Xem giỏ hàng** → Click icon giỏ hàng
- ✅ **Xóa sản phẩm** → Click xóa trên trang Cart
- ✅ **Tự động lưu** trạng thái giỏ hàng

**Key localStorage:** `sneakerhub_cart_count`

---

### 4️⃣ **WISHLIST (Yêu Thích)** ❤️
**Được quản lý tại:** Product Cards (Tất cả trang)

**Dữ liệu lưu:**
- Mảng ID sản phẩm yêu thích
- Trạng thái like/unlike

**Các thao tác:**
- ✅ **Thêm vào wishlist** → Click icon trái tim
- ✅ **Xóa khỏi wishlist** → Click lại icon
- ✅ **Tự động lưu** danh sách yêu thích

**Key localStorage:** `sneakerhub_wishlist`

---

## 🔄 Quy Trình Quản Lý Dữ Liệu

### **THÊM DỮ LIỆU:**
```
1. Admin vào Admin Panel
   ↓
2. Chọn tab (Products / Users)
   ↓
3. Click "Thêm Mới"
   ↓
4. Điền thông tin form
   ↓
5. Click "Thêm"
   ↓
6. Context (addProduct/addUser) được gọi
   ↓
7. setProducts/setUsers được cập nhật
   ↓
8. useEffect tự động lưu vào localStorage
   ↓
9. ✅ Dữ liệu lưu thành công!
   ↓
10. Dữ liệu hiển thị ngay lập tức trên toàn app
```

### **CHỈNH SỬA DỮ LIỆU:**
```
1. Admin tìm sản phẩm/người dùng
   ↓
2. Click "Edit"
   ↓
3. Form được điền sẵn thông tin cũ
   ↓
4. Thay đổi thông tin
   ↓
5. Click "Cập Nhật"
   ↓
6. Context (updateProduct/updateUser) được gọi
   ↓
7. setProducts/setUsers được cập nhật
   ↓
8. useEffect tự động lưu vào localStorage
   ↓
9. ✅ Dữ liệu cập nhật thành công!
   ↓
10. Thay đổi hiển thị ngay khắp ứng dụng
```

### **XÓA DỮ LIỆU:**
```
1. Admin chọn xóa sản phẩm/người dùng
   ↓
2. Xác nhận xóa
   ↓
3. Context (deleteProduct/deleteUser) được gọi
   ↓
4. setProducts/setUsers lọc bỏ item
   ↓
5. useEffect tự động lưu vào localStorage
   ↓
6. ✅ Dữ liệu xóa thành công!
   ↓
7. Item biến mất khỏi app ngay lập tức
```

---

## 🔐 Dòng Chảy Dữ Liệu

### **Loading Dữ Liệu (Khi mở app):**
```
App mở
  ↓
DataProvider khởi động
  ↓
useState(() => {
  localStorage.getItem('sneakerhub_products')
})
  ↓
Nếu có dữ liệu → Load từ localStorage
  ↓
Nếu không có → Load default products
  ↓
✅ Dữ liệu ready
  ↓
Render UI với dữ liệu
```

### **Saving Dữ Liệu (Khi thay đổi):**
```
User thêm/sửa/xóa sản phẩm
  ↓
Component gọi addProduct/updateProduct/deleteProduct
  ↓
setProducts được gọi
  ↓
useEffect phát hiện products thay đổi
  ↓
localStorage.setItem('sneakerhub_products', JSON.stringify(products))
  ↓
✅ Dữ liệu lưu vào localStorage
  ↓
Tất cả component nhận dữ liệu mới
  ↓
UI được cập nhật tự động (React re-render)
```

---

## 📍 Quản Lý Từ Admin Panel

### **Dashboard Tab:**
- 📊 Thống kê tổng quan
- 📈 Số sản phẩm: 12
- 👥 Số người dùng: 2+
- 🛒 Tổng giỏ hàng
- ⭐ Đánh giá trung bình

### **Products Tab:**
- 🔍 Xem danh sách 12 sản phẩm
- ➕ Thêm sản phẩm mới
- ✏️ Chỉnh sửa từng sản phẩm
- ❌ Xóa sản phẩm không cần
- 💾 Tất cả tự động lưu

### **Users Tab:**
- 👥 Xem danh sách người dùng
- 🔓 Thay đổi quyền Admin
- ❌ Xóa tài khoản người dùng
- 💾 Tất cả tự động lưu

---

## ✅ Tính Năng Quản Lý

| Tính Năng | Sản Phẩm | Người Dùng | Giỏ Hàng | Wishlist |
|-----------|----------|-----------|----------|----------|
| Xem danh sách | ✅ | ✅ | ✅ | ✅ |
| Thêm mới | ✅ | ✅ | ✅ | ✅ |
| Chỉnh sửa | ✅ | ✅ | ✅ | ✅ |
| Xóa | ✅ | ✅ | ✅ | ✅ |
| Tự động lưu | ✅ | ✅ | ✅ | ✅ |
| Persist | ✅ | ✅ | ✅ | ✅ |
| Real-time update | ✅ | ✅ | ✅ | ✅ |

---

## 🚀 Lợi Ích Của Hệ Thống

✅ **Tập Trung:** Quản lý từ một nơi duy nhất (Admin Panel)
✅ **Tự Động:** Lưu dữ liệu tự động, không cần click "Save"
✅ **Nhanh:** Cập nhật tức thì, không cần reload
✅ **Bảo Toàn:** Dữ liệu không bị mất khi refresh
✅ **Dễ Dùng:** Giao diện thân thiện, dễ hiểu
✅ **Linh Hoạt:** Thêm/sửa/xóa dễ dàng
✅ **Đồng Bộ:** Tất cả client đều cập nhật (trên cùng browser)

---

## 🔍 Kiểm Tra Dữ Liệu

### Trong Browser DevTools:
```
F12 → Application → Local Storage → Chọn domain
```

**Bạn sẽ thấy:**
- `sneakerhub_products` - Danh sách 12 sản phẩm (JSON)
- `sneakerhub_users` - Danh sách người dùng (JSON)
- `sneakerhub_cart_count` - Số lượng giỏ hàng (string)
- `sneakerhub_wishlist` - Danh sách yêu thích (JSON)

---

## 📝 Tóm Tắt

| Yếu Tố | Chi Tiết |
|--------|---------|
| **Nơi Quản Lý** | Admin Panel (AdminPage.jsx) |
| **Nơi Xử Lý** | DataContext.jsx & AuthContext.jsx |
| **Nơi Lưu Trữ** | Browser localStorage |
| **Số Sản Phẩm** | 12 sản phẩm |
| **Số Người Dùng** | 2+ người dùng |
| **Tự Động Lưu** | ✅ Có |
| **Persist** | ✅ Có (cho đến khi clear cache) |
| **Real-time Update** | ✅ Có (tất cả component) |

---

## 🎉 Kết Luận

**Hệ thống SneakerHub quản lý TOÀN BỘ dữ liệu một cách tập trung, tự động, và hiệu quả:**

✅ Tất cả dữ liệu (Sản phẩm, Người dùng, Giỏ hàng, Wishlist)
✅ Quản lý từ Admin Panel
✅ Tự động lưu vào localStorage
✅ Không cần backend server
✅ Dữ liệu persist (tồn tại)
✅ Real-time update khắp ứng dụng

**Bạn có thể yên tâm quản lý toàn bộ dữ liệu của cửa hàng từ Admin Panel!** 🚀

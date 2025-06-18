
# 🛠️ Quản lý User Admin

Tài liệu này mô tả cấu trúc thư mục, các lớp chức năng và luồng dữ liệu cho logic quản lý **User Admin** trong dự án.

---

## 📂 Sơ đồ cấu trúc thư mục

Logic được tổ chức theo từng **lớp chức năng riêng biệt** để dễ bảo trì và mở rộng.

```
src/
├── apis/
│   └── admin/
│       └── userApi.ts                          # Các hàm gọi API liên quan đến user
├── Application/
│   └── constants/
│       └── admin/
│           └── admin.userConstants.ts          # Hằng số và các object mapping
├── hooks/
│   └── admin/
│       ├── useUsers.ts                         # Hook để lấy danh sách user
│       └── useUserMutations.ts                 # Hook để tạo/sửa/xoá user
└── types/
    └── admin/
        └── userTypes.ts                        # Các interface và kiểu dữ liệu cho user
```

---

## 🧱 Giải thích các Lớp

### 1. `types/admin/userTypes.ts`

**Mục đích**:  
Xác định rõ **hình dạng** của tất cả dữ liệu liên quan đến user, đóng vai trò như một hợp đồng giữa frontend và backend

**Nội dung chính**:
- `BackendUserResponse`: Cấu trúc dữ liệu thô mà backend trả về.
- `PaginatedUsersResponse`: Dữ liệu đã được xử lý để sử dụng trong UI (này để lấy luôn cái total để phân trang).
- `UseUsersOptions`: Các tuỳ chọn phân trang, tìm kiếm, lọc cho hook `useUsers` (page, limit, filter, search, sort).
- `EditUserStatusPayload`: Payload cần thiết để thay đổi user status (Active/Banned).
- `EditUserStatusResponse`: Lấy về message để handle (error hay success)

---

### 2. `Application/constants/admin/admin.userConstants.ts`

**Mục đích**:  
Tập trung các giá trị tĩnh và các mapping

**Nội dung chính**:
- `STATUS_TO_VERIFY_MAP`: Map trạng thái (VD: `"Active"`) sang số backend hiểu được (VD: `0`).
- `ROLE_TO_ROLE_MAP`: Map từ chuỗi role (VD: `"Admin"`) sang số.
- `SEARCH_FIELD_MAP`: Map từ tên field trên frontend sang query param của backend (VD: `"name"` → `"_name_like"`).

---

### 3. `apis/admin/userApi.ts`

**Mục đích**:  
Chứa các hàm call API

**Các hàm chính**:
- `fetchUsers(options: UseUsersOptions): Promise<PaginatedUsersResponse>`  
  - Gọi `GET /user/get-users`
  - Xử lý response thành định dạng sạch để dùng trong app

- `editUserStatusAPI(payload: EditUserStatusPayload): Promise<any>`  
  - Gửi request `PATCH` đến `/user/:id/edit-status` với userId và status

> 💡 Ghi chú: Các hàm như `createUserAPI`, `deleteUserAPI` sẽ được thêm trong tương lai.

---

### 4. `hooks/admin/useUsers.ts` và `useUserMutations.ts`

#### `useUsers.ts`

- **Mục đích**: Hook để **đọc** dữ liệu user.
- **Cách hoạt động**:
  - Dùng `useQuery` để gọi `fetchUsers`.
  - Tự xử lý cache, loading, error,...

#### `useUserMutations.ts`

- **Mục đích**: Hook để **ghi** dữ liệu (tạo, cập nhật, xoá).
- **Cách hoạt động**:
  - Dùng `useMutation` để gọi API như `editUserStatusAPI`.
  - Trong `onSuccess`, gọi:
    ```ts
    queryClient.invalidateQueries({ queryKey: ['users'] })
    ```
    → Đảm bảo UI fetch lại dữ liệu mới nhất.

---

## 🔄 Luồng dữ liệu mẫu: Sửa trạng thái của User

Luồng xử lý khi người dùng click "Cấm User":

1. **Component UI (`UserListDashboard.tsx`)**  
   Gọi:
   ```ts
   editUserStatusMutation.mutate({ userId: '...', status: 1 })
   ```

2. **Hook (`useUserMutations.ts`)**  
   Hàm `mutationFn` được kích hoạt.

3. **API Service (`userApi.ts`)**  
   Gọi `editUserStatusAPI`, gửi request `PATCH`.

4. **Backend**  
   Xử lý request và trả về phản hồi thành công.

5. **Hook `onSuccess` chạy**  
   - Hiển thị toast `"User status updated successfully!"`
   - Gọi:
     ```ts
     queryClient.invalidateQueries({ queryKey: ['users'] })
     ```

6. **React Query**  
   Phát hiện dữ liệu `['users']` đã cũ → fetch lại.

7. **Hook `useUsers.ts`**  
   Tự động gọi `fetchUsers()`.

8. **Component UI**  
   Re-render với data mới.  
   Badge status user chuyển thành `"Banned"`.

---

## ✅ Chốt

- **Tách biệt rõ ràng các lớp logic** (types, constants, API, hooks)
- **Dễ bảo trì** khi thay đổi logic hoặc backend
- **UI luôn đồng bộ dữ liệu mới nhất** nhờ Tanstack Query
- **Dễ mở rộng** khi thêm các chức năng khác trong tương lai

==> QUÁ ĐÃ
---

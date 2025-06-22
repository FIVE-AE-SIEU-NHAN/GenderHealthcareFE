
# 📘 Lấy danh sách người dùng có phân trang bằng TanStack Query


## 📑 Mục lục

- [📂 Sơ đồ cấu trúc thư mục](#-sơ-đồ-cấu-trúc-thư-mục)
- [1. 🧩 `useUsers` – Custom Hook để lấy danh sách người dùng](#1-🧩-useusers--custom-hook-để-lấy-danh-sách-người-dùng)
  - [✅ Giải thích](#-giải-thích)
- [2. 🚀 `fetchUsers` – Gọi API và map data trả về](#2-🚀-fetchusers--gọi-api-và-map-data-trả-về)
  - [✅ Giải thích](#-giải-thích-1)
  - [💡 Ví dụ dữ liệu từ backend](#💡-ví-dụ-dữ-liệu-từ-backend)
  - [🔄 Cơ chế mapping](#-cơ-chế-mapping)
- [3. 📚 Các kiểu dữ liệu liên quan](#3-📚-các-kiểu-dữ-liệu-liên-quan)
  - [📥 `UseUsersOptions` – Tham số truyền vào từ UI](#-useusersoptions--tham-số-truyền-vào-từ-ui)
  - [🌐 `BackendUserResponse` – Dữ liệu backend trả về](#-backenduserresponse--dữ-liệu-backend-trả-về)
  - [📤 `PaginatedUsersResponse` – Dữ liệu trả về từ `useUsers`](#-paginatedusersresponse--dữ-liệu-trả-về-từ-useusers)
- [✅ Tóm tắt luồng xử lý](#-tóm-tắt-luồng-xử-lý)


## 📂 Sơ đồ cấu trúc thư mục

Logic được tổ chức theo từng **lớp chức năng riêng biệt** để dễ bảo trì và mở rộng.

```
src/
├── apis/
│   └── admin/
│       └── userApi.ts                          # Các hàm gọi API liên quan đến user
│ 
│ 
├── Application/
│   └── constants/
│       └── admin/
│           └── admin.userConstants.ts          # Map lại data
│ 
│ 
├── hooks/
│   └── admin/
│       ├── useUsers.ts                         # Hook để lấy danh sách user
│       └── useUserMutations.ts                 # Hook để tạo/sửa/xoá user
│ 
│ 
├── pages/
│   └── Admin/
│       └── user/                                
│            └──  UserList.tsx                  # User List Dashboard
│ 
│ 
└── types/
    └── admin/
        └── userTypes.ts                        # Các interface và kiểu dữ liệu cho user
```

---

## 1. `useUsers` – Custom Hook để lấy danh sách người dùng

**📄 File:** `useUsers.ts`

```ts
export function useUsers(options: UseUsersOptions) {
  const queryKey = ['users', options];

  return useQuery<PaginatedUsersResponse, Error>({
    queryKey,
    queryFn: () => fetchUsers(options),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
}
```

### ✅ Giải thích

- `useUsers` là 1 hook sử dụng `@tanstack/react-query` để gọi API lấy danh sách người dùng.
- `queryKey = ['users', options]` để định danh truy vấn để React Query cache và quản lý refetch. Đọc xong nghe ngáo người luôn :))) Nhưng mà thực ra nó là như này:
    * `users` ở đây sẽ là cái tên để mình đặt cho cái cache của users list. 
    * Kiểu sau này mình có thêm 1 danh sách khác như questions list đi thì mình đặt tên cho cái cache đó là questions. 
    * => Đặt vậy để thằng Tanstack xác định được cái cache nào là cái nào th

- `fetchUsers(options)`: gọi hàm lấy dữ liệu người dùng từ backend (chỗ này tương tác với API).
- `staleTime`: set `staleTime = 5 * 6 * 1000` thì dữ liệu được xem là “fresh” trong 5 phút. Nghĩa là:
    * Sau 5' data đó sẽ chuyển thành data cũ. Và Tanstack sẽ refetch lại nếu người dùng đang **focus** vào data đó.
    * VD: Mở trang 1 ds user lên, web gọi API lấy data trong trang 1 về. Sau đó mở trang 2 thì web gọi API lấy data trong trang 2 về. Trong vòng 5' quay lại trang 1 lần nữa thì sẽ ko gọi API nữa, sau 5' data trang 1 đc xem như dữ liệu đã cũ --> Gọi lại API
- `keepPreviousData`: giữ lại dữ liệu cũ trong lúc đang fetch dữ liệu mới để tránh nhấp nháy UI.
    * Đang trang 1 ấn qua trang 2, do có độ trễ khi gọi API nên dữ liệu trang 2 ko hiện liền đc. 
    * Nếu lúc này mà ẩn data của trang 1 luôn thì trên màn hình lúc này sẽ để bảng trống. 
    * Nên dùng cái này để dữ lại data trang 1, nếu đã nhận data trang 2 thì lúc này sẽ ẩn data trang 1 và hiện data trang 2.

---

## 2. `fetchUsers` – Gọi API và map data trả về

**📄 File:** `userApi.ts`

```ts
export const fetchUsers = async ({ page, limit, filters, search, sort, dateRange }: UseUsersOptions): Promise<PaginatedUsersResponse> => {
  const params = { ... }; // xử lý query params

  const response = await api.get<BackendUserResponse>('/user/get-users', { params });
  const result = response.data?.result;

  return {
    data: result?.users ?? [],
    total: result?.total ?? 0,
  };
};
```

### ✅ Giải thích

- Gọi API `GET /user/get-users` với các tham số truyền từ UI (`page`, `limit`, `search`, `filters`, `sort`, `dateRange`).
- Sử dụng `axios.get<BackendUserResponse>` để định kiểu dữ liệu từ backend.
#### 💡 Chỗ này KietMN trả về cái format:
```json
{
  "message": "Get users for admin successfully",
  "result": {
    "users": [
      {
        "id": "7a622730-4809-11f0-bfde-0242ac110002",
        "name": "Customer Five",
        "email": "customer5@example.com",
        "date_of_birth": "2004-09-14T00:00:00.000Z",
        "gender": "male",
        "password": "...",
        "phone_number": "0123456789",
        "created_at": "2025-06-13T03:49:59.000Z",
        "updated_at": "2025-06-13T03:49:59.000Z",
        "forgot_password_token": "",
        "google_id": "",
        "verify": 1,
        "role": 3
      }
    ],
    "total": 70
  }
}
```
👉 Nên là mình sẽ định nghĩa `BackendUserResponse` theo format đó (xem tiếp ở `3. Các kiểu dữ liệu liên quan`)
- Kết quả được map lại sang định dạng `PaginatedUsersResponse`để dễ dùng cho frontend.

### 🔄 Cơ chế mapping

```
BackendUserResponse → PaginatedUsersResponse
```

Thực hiện qua:

```ts
return {
  data: result?.users ?? [],
  total: result?.total ?? 0,
};
```

---

## 3. Các kiểu dữ liệu liên quan

**📄 File:** `userTypes.ts`

### 📥 `UseUsersOptions` – Tham số truyền vào từ UI

```ts
export interface UseUsersOptions {
  page: number;
  limit: number;
  filters: Record<string, string | number | (string | number)[]>;
  search: {
    field: string;
    value: string;
  };
  sort: {
    field: keyof User;
    direction: 'asc' | 'desc';
  };
  dateRange?: {
    field?: string;
    from?: Date;
    to?: Date;
  };
}
```
> 👉 Đây là interface mô tả cấu trúc `options` mà UI truyền vào để gọi API.
---

### 🌐 `BackendUserResponse` – Định nghĩa Dữ liệu backend trả về

```ts
export interface BackendUserResponse {
  message: string;
  result: {
    users: User[];
    total: number;
  };
}
```

---
### 📤 `PaginatedUsersResponse` – Dữ liệu trả về từ `useUsers`

```ts
export interface PaginatedUsersResponse {
  data: User[];
  total: number;
}
```
> Nhớ rằng mình đã map BackendUserResponse thành PaginatedUsersResponse để frontend dễ dùng nha mấy bro.
> Do BE trả về có cái trường `message` nữa nhưng mình đâu có dùng để hiển thị ra (message chỗ đó để debug th mấy bro). 
---
## ✅ Tóm tắt luồng xử lý

1. Component gọi hook `useUsers(options)` 
    * VD: file `UserList.tsx` ở `src/pages/Admin/user/UserList.tsx`
2. Trong Hook thì gọi hàm `fetchUsers(options)`
3. `fetchUsers` xây dựng `params` → gọi API `/user/get-users`
4. API trả về kiểu `BackendUserResponse`
5. Hàm `fetchUsers` map lại data theo dạng `PaginatedUsersResponse`
6. `useQuery` cache dữ liệu theo `['users', options]`

---


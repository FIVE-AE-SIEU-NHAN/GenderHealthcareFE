
# ⏳ Hiểu rõ `async/await` với `axios` trong dự án

> Đây là hướng dẫn đơn giản & dễ hiểu về cách dùng `async/await` với `axios` khi gọi API trong frontend/backend.

---

## 🧠 Tại sao cần `async/await`?

Khi gọi API với axios, dữ liệu không trả về ngay lập tức — nó cần **thời gian để chờ response từ server**.  
`async/await` giúp mấy bro viết code xử lý bất đồng bộ trông như đồng bộ — dễ đọc, dễ debug hơn Promise.

---

## 🛠 Cách viết cơ bản

### Ví dụ 1: Gọi API lấy danh sách người dùng

```ts
import axios from 'axios';

async function fetchUsers() {
  try {
    const response = await axios.get('/api/users');
    console.log('Dữ liệu trả về:', response.data);
  } catch (error) {
    console.error('Lỗi gọi API:', error);
  }
}
```

- `await axios.get(...)` chờ cho đến khi API trả về
- Nếu thành công → `response.data` chứa dữ liệu từ backend
- Nếu lỗi → nhảy vào `catch`

---

## 📦 Dùng với TypeScript

```ts
interface User {
  id: string;
  name: string;
}

interface UserResponse {
  data: User[];
}

async function fetchUsers(): Promise<User[]> {
  const response = await axios.get<UserResponse>('/api/users');
  return response.data.data;
}
```

✅ Ưu điểm:
- `axios.get<T>()`: giúp TypeScript biết chính xác kiểu dữ liệu mình mong đợi
- Gọn gàng, dễ autocomplete

---

## 💥 Xử lý lỗi rõ ràng hơn

```ts
try {
  const res = await axios.get('/api/users');
} catch (err: any) {
  if (axios.isAxiosError(err)) {
    console.error('❌ Axios error:', err.response?.data?.message);
  } else {
    console.error('❌ Unknown error:', err);
  }
}
```

---

## 🌀 Tích hợp vào React Query (queryFn)

```ts
const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get('/api/users');
  return res.data;
};
```

```ts
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
});
```

---

## ✅ Tổng kết

| Khái niệm       | Ý nghĩa                             | Hình dung |
|----------------|--------------------------------------|----------------------|
| `async`         | Hàm trả về Promise                   | Gọi món 
| `await`         | Chờ 1 Promise resolve trước khi tiếp tục | Nhận được đồ ăn sau khi chờ 
| `axios.get<T>()` | Gọi API với kiểu dữ liệu trả về     | Bồi bàn vào "bếp" lấy đồ ăn
| `try/catch`     | Bắt lỗi khi gọi API                 |

---

> 🚀 Mẹo: Luôn dùng `try/catch` để tránh crash app khi gọi API. Kết hợp với TypeScript để tối ưu type-safe

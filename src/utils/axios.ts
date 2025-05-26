import axios from 'axios';

// Tạo instance axios với các cấu hình mặc định
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Địa chỉ API của bạn
  timeout: 15000, // 15 giây
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default apiClient;
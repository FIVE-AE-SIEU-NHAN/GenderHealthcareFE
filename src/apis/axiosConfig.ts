import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosInstance.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem('access_token');

//   if (accessToken) {
//     config.headers['Authorization'] = `Bearer ${accessToken}`; 
//     config.timeout = 30000;
//   }

//   return config;
// }, (error) => Promise.reject(error));

// axiosInstance.interceptors.response.use(
//   response => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       // Gọi API refresh
//       try {
//         const res = await axios.post('/user/refresh-token', {}, { withCredentials: true });
//         const newAccessToken = res.data.access_token;
//         localStorage.setItem('access_token', newAccessToken);

//         // Retry lại request cũ
//         error.config.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(error.config);
//       } catch (err) {
//         // Redirect login nếu refresh cũng lỗi
//         window.location.href = '/login';
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );


export default axiosInstance;
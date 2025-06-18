import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  config.headers = config.headers || {};
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Gọi API refresh
      console.log(error.response.message);
      // Lay refresh token tu localStorage
      // xoa 2 token khoi localStorage
      // Call API login voi refresh token
      // Nhan 2 token moi tu API
      // Luu 2 token moi vao localStorage
      // Tiep tuc request ban dau voi token moi
      // Tim hieu cach duy tri dang nhap khi refresh token het han

    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
import axiosInstance from './axiosConfig';

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await axiosInstance.post('/user/login', credentials);

    const { access_token, refresh_token } = response.data;

    // Lưu access_token và refresh_token vào localStorage (hoặc memory nếu muốn an toàn hơn)
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    return response;
  },
};
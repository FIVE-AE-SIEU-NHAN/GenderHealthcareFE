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

let isRefreshing = false;

type QueuedRequest = {
  onSuccess: (token: string) => void;
  onFailure: (error: unknown) => void;
};

let requestQueue: QueuedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  requestQueue.forEach((queued) => {
    if (token) {
      queued.onSuccess(token);
    } else {
      queued.onFailure(error);
    }
  });
  requestQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;
    const rs = error.response.data.message.toLowerCase();

    if (error.response?.status === 401 && !originalRequest._retry && rs === 'jwt expired') {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          requestQueue.push({
            onSuccess: (token: string) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            onFailure: (err: unknown) => {
              reject(err);
            },
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(`${BASE_URL}user/refresh-token`, {
          refresh_token: refreshToken,
        }) as { data: { result: { access_token: string; refresh_token: string } } };

        const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data.result as {
          access_token: string;
          refresh_token: string;
        };

        localStorage.setItem('access_token', newAccessToken);
        localStorage.setItem('refresh_token', newRefreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
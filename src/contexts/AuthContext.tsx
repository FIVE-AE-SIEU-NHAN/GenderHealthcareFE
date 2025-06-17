import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  user_id: string;
  role: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        setUser(jwtDecode<User>(accessToken));
      }
    } catch {
      // Nếu có lỗi (token hỏng, hết hạn, v.v.), chỉ cần âm thầm bỏ qua.
      // Không cần log lỗi, vì đây là trường hợp có thể xảy ra.
      // Interceptor sẽ xử lý việc đăng xuất khi có API call tiếp theo.
    } finally {
      setIsLoading(false);
    }
  }, []);



  const login = (accessToken: string) => {
    setUser(jwtDecode<User>(accessToken));
  };



  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  const value = { user, isLoading, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
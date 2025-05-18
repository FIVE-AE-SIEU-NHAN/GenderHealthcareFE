import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xóa thông tin đăng nhập giả lập
    localStorage.removeItem('user');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Đăng xuất thành công!</h2>
        <p className="mt-2 text-gray-500">Đang chuyển hướng đến trang đăng nhập...</p>
      </div>
    </div>
  );
};

export default Logout;

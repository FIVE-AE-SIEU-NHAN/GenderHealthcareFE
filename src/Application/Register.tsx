import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 hidden md:flex items-center justify-center bg-teal-600">
        <img
          src="/images/hospital-logo.png"
          alt="Hospital Logo"
          className="w-2/3"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-3/4 max-w-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-4">Tạo tài khoản mới</h2>
          <form>
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full border p-2 mb-4 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-4 rounded"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full border p-2 mb-4 rounded"
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              className="w-full border p-2 mb-4 rounded"
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
            >
              Đăng ký
            </button>
          </form>
          <p className="text-sm mt-4 text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-teal-600 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

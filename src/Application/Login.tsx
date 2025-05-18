import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-teal-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg flex w-full max-w-5xl overflow-hidden">
        
        {/* Left side: Logo */}
        <div className="w-1/2 bg-teal-600 flex items-center justify-center p-8">
          <img
            src="/images/hospital-logo.png" // Thay bằng đường dẫn logo bệnh viện của bạn
            alt="Hospital Logo"
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>

        {/* Right side: Login form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-teal-700 mb-6">
            Chào mừng bạn đã đến với bệnh viện
          </h2>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-teal-700 font-semibold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-teal-700 font-semibold mb-2">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 text-white font-semibold py-3 rounded hover:bg-teal-800 transition"
            >
              Đăng nhập
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Nếu chưa có tài khoản, hãy{' '}
            <a href="/register" className="text-teal-700 font-semibold hover:underline">
              đăng ký tại đây
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

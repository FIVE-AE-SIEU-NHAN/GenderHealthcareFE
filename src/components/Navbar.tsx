import React from 'react';

const Navbar:  React.FC  = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-40">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <a href="/" className="text-sky-600 font-bold text-xl flex items-center gap-1">
          <i className="fa fa-h-square" />Gender Healthcare Center
        </a>
        <ul className="flex gap-6 text-sm font-medium items-center">
          <li><a href="#top" className="hover:text-sky-600"> Trang chủ</a></li>
          <li><a href="#about" className="hover:text-sky-600"> Giới thiệu</a></li>
          <li><a href="/blog" className="hover:text-sky-600">Blog</a></li>
          <li><a href="#news" className="hover:text-sky-600">Dịch vụ xét nghiệm STIs</a></li>
          <li><a href="#google-map" className="hover:text-sky-600">Theo dõi chu kỳ</a></li>
          <li><a href="#google-map" className="hover:text-sky-600">Đặt lịch tư vấn</a></li>
          <li><a href="#google-map" className="hover:text-sky-600">Contact</a></li>

          <li className="flex gap-1">
            <a
              href="/login"
              className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-white hover:text-sky-600 transition min-w-[120px] text-center"
            >
              Đăng Nhập
            </a>
            <a
              href="/register"
              className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-white hover:text-sky-600 transition min-w-[120px] text-center"
            >
              Đăng Ký
            </a>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

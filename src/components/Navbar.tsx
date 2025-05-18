import React from 'react';

const Navbar:  React.FC  = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-40">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <a href="/" className="text-teal-500 font-bold text-xl flex items-center gap-1">
          <i className="fa fa-h-square" />Gender Healthcare Center
        </a>
        <ul className="flex gap-6 text-sm font-medium items-center">
          <li><a href="#top" className="hover:text-teal-500"> Trang chủ</a></li>
          <li><a href="#about" className="hover:text-teal-500"> Giới thiệu</a></li>
          <li><a href="#team" className="hover:text-teal-500">Blog</a></li>
          <li><a href="#news" className="hover:text-teal-500">Dịch vụ xét nghiệm STIs</a></li>
          <li><a href="#google-map" className="hover:text-teal-500">Theo dõi chu kỳ</a></li>
          <li><a href="#google-map" className="hover:text-teal-500">Đặt lịch tư vấn</a></li>
          <li><a href="#google-map" className="hover:text-teal-500">Contact</a></li>
            
          <li>
            <a href="/login" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Đăng Nhập
            </a> <a href="/login" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Đăng Ký
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

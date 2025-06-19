import React, { useState } from 'react';
// Import icons from the react-icons library
import {
  FaRegFileAlt,
  FaPencilAlt,
  FaMapMarkerAlt,
  FaLock,
  FaSignOutAlt,
  FaUserCircle,
  FaSearch,
  FaShoppingCart,
  FaChevronDown,
} from 'react-icons/fa';

// Define a type for our sidebar items for better code quality and type safety
type SidebarItemType = {
  id: string;
  label: string;
  icon: React.ElementType; // Allows passing icon components as a prop
};

// --- Data for UI elements ---
const sidebarItems: SidebarItemType[] = [
  { id: 'orders', label: 'Đơn hàng', icon: FaRegFileAlt },
  { id: 'profile', label: 'Chỉnh sửa thông tin cá nhân', icon: FaPencilAlt },
  { id: 'address', label: 'Sổ địa chỉ', icon: FaMapMarkerAlt },
  { id: 'password', label: 'Đổi mật khẩu', icon: FaLock },
  { id: 'logout', label: 'Đăng xuất', icon: FaSignOutAlt },
];



// --- Reusable Sub-components ---

// Header Component (A simplified version of the one in the screenshot)
const Header = () => (
  <header className="bg-white shadow-sm sticky top-0 z-10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Left Section: Logo and Main Navigation */}
        
        {/* Right Section: Search, Cart, and User Menu */}
        
      </div>
    </div>
  </header>
);

// Sidebar Component
const Sidebar = ({ activeItem, setActiveItem }: { activeItem: string; setActiveItem: (id: string) => void; }) => (
  <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-sm self-start">
    <div className="flex items-center mb-8">
      <FaUserCircle className="text-5xl text-gray-300 mr-4" />
      <div className="relative group">
        <span className="cursor-pointer font-medium text-gray-700 hover:text-blue-600 flex items-center">
          Nguyễn Đình Hưng
          <FaChevronDown className="ml-2 text-xs" />
        </span>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bảng điều khiển</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đơn hàng của tôi</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Thông tin cá nhân</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sổ địa chỉ</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đổi mật khẩu</a>
          <hr className="my-1"/>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đăng xuất</a>
        </div>
      </div>
    </div>
    <nav>
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.id} className="mb-2">
            <button
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center p-3 rounded-md text-left transition-colors duration-200 ${
                activeItem === item.id
                  ? 'bg-blue-50 text-blue-600 font-bold' // Active state style
                  : 'text-gray-600 hover:bg-gray-100' // Default state style
              }`}
            >
              <item.icon className={`mr-3 text-lg ${activeItem === item.id ? 'text-blue-600' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

// Form Input Component for reusability
const FormInput = ({ label, id, type = 'text', placeholder, value }: { label: string; id: string; type?: string; placeholder: string; value: string; }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input type={type} id={id} name={id} placeholder={placeholder} defaultValue={value} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
  </div>
);

// Main Content Form
const ProfileForm = () => (
  <main className="w-full lg:w-3/4 bg-white p-8 lg:ml-6 mt-6 lg:mt-0 rounded-lg shadow-sm">
    <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
      Chỉnh sửa thông tin cá nhân
    </h1>
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
        <FormInput label="Họ và tên" id="fullName" placeholder="Nhập họ và tên" value="" />
        <FormInput label="Số điện thoại" id="phone" type="tel" placeholder="Nhập số điện thoại" value="" />
      </div>
      <FormInput label="Email" id="email" type="email" placeholder="Nhập email" value="" />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Giới tính</label>
        <div className="flex items-center space-x-6">
          {['Nam', 'Nữ', 'Khác'].map(gender => (
            <label key={gender} className="flex items-center cursor-pointer">
              <input type="radio" name="gender" value={gender.toLowerCase()} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-600" />
              <span className="ml-2 text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <select className="flex-1 mb-2 sm:mb-0 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
            <option>Ngày</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select className="flex-1 mb-2 sm:mb-0 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
            <option>Tháng</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
            <option>Năm</option>
            {Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i)).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300">
        Lưu thông tin
      </button>
    </form>
  </main>
);

// --- Main Page Component ---
const UserProfilePage = () => {
  // State to manage which sidebar item is currently active
  const [activeItem, setActiveItem] = useState('profile');

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* <Header /> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 text-sm text-gray-500">
          <a href="#" className="hover:text-blue-600">Trang chủ</a>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">Tài khoản người dùng</span>
        </div>

        {/* Main Content Area with Sidebar and Form */}
        <div className="flex flex-col lg:flex-row">
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
          {/* 
            In a real application, you would conditionally render the correct component 
            based on the `activeItem` state. For this example, we always show the ProfileForm.
            e.g., {activeItem === 'profile' && <ProfileForm />}
                  {activeItem === 'orders' && <OrdersComponent />}
          */}
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
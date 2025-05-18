import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-teal-500 text-white text-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        <p>Welcome to a Professional Gender Health Care</p>
        <div className="flex space-x-4 text-sm">
  <span className="flex items-center space-x-2">
    <i className="fa fa-phone"></i>
    <span>010-060-0160</span>
  </span>

  <span className="flex items-center space-x-2">
    <i className="fa fa-calendar-plus"></i>
    <span>6:00 AM - 10:00 PM (Mon-Fri)</span>
  </span>

  <span className="flex items-center space-x-2">
    <i className="fa fa-envelope"></i>
    <a href="#" className="underline">info@fpt.edu.vn</a>
  </span>
</div>
      </div>
    </header>
  );
};

export default Header;

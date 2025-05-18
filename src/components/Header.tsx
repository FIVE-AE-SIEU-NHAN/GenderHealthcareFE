import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-sky-600 text-white text-sm">
      <div className="container mx-auto flex justify-between items-center p-2">
        <p>Welcome to a Professional Gender Health Care</p>
        <div className="flex space-x-4 text-sm">
  <span className="flex items-center space-x-2">
    <a href="https://www.instagram.com/im_winds/" target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-instagram"></i>
</a>
  </span>

  <span className="flex items-center space-x-2">
    <a href="https://www.facebook.com/minhnhat3082001/" target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-facebook"></i>
</a>
  </span>

  <span className="flex items-center space-x-2">
        <a href="https://www.facebook.com/minhnhat3082001/" target="_blank" rel="noopener noreferrer">
    <i className=" fa-brands fa-x-twitter"></i>
</a>

  </span>
</div>
      </div>
    </header>
  );
};

export default Header;

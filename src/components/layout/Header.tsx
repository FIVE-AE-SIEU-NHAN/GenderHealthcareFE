import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-sky-600 text-white text-sm">
      <div className="mx-7 flex justify-between items-center p-2">
        <p>contact@info.com</p>
        <div className="flex space-x-4 text-sm">
  <span className="flex items-center space-x-2">
    <a href="" target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-instagram"></i>
</a>
  </span>

  <span className="flex items-center space-x-2">
    <a href="" target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-facebook"></i>
</a>
  </span>

  <span className="flex items-center space-x-2">
        <a href="" target="_blank" rel="noopener noreferrer">
    <i className=" fa-brands fa-x-twitter"></i>
</a>

  </span>
</div>
      </div>
    </header>
  );
};

export default Header;

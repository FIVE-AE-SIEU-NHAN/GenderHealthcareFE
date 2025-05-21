import React from 'react';

const Navbar:  React.FC  = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-40">
      <div className="mx-10 px-2 flex justify-between items-center py-4">
        <a href="/" className=" text-xl flex items-center gap-1">
          <img src='images/logo.webp' alt='logo' className='w-[60px]'/>
          <div className="logo">
            <div className="font-extrabold text-shadow-lg">Care4Gender</div>
            <div className='text-shadow-lg'>Gender HealthCare</div>
          </div>
        </a>
        <ul className="flex gap-6 text-sm font-medium items-center">
          <li><a href="#top" className="nav-text">Home</a></li>
          <li><a href="#menu" className="nav-text">Menu</a></li>
          <li><a href="#blog" className="nav-text">Blog</a></li>
          <li><a href="#about us" className="nav-text">About Us</a></li>
          <li><a href="#appointment" className="nav-text">Book an appointment</a></li>
        </ul>
        <li className="flex gap-1">
          <a
            href="/login"
            className="bg-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-800 transition duration-200 font-semibold"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="border-2 border-dark-blue text-dark-blue px-4 py-2 rounded-button hover:bg-blue-50 transition duration-200 font-semibold"
          >
            Sign Up
          </a>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './Application/Homepage';
import Logout from './Application/Logout';
import Signup from './Application/Signup';
import LoginPage from './Application/Signin';

const App: React.FC = () => {
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<HomePage />} />
      </Routes>
      {!hideFooter && <Footer />}
    </BrowserRouter>
  );
};

export default App;

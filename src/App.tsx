import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ReactLenis } from 'lenis/react'
import sal from 'sal.js';
import 'sal.js/dist/sal.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './pages/Common/Home/Homepage';
import Logout from './Application/Logout';
import Signup from './pages/Auth/Signup/Signup';
import LoginPage from './pages/Auth/Login/Login';
import { NotFound } from './pages/Common/NotFound'; 
import Dashboard from './pages/Admin/Dashboard';
import Unauthorized from './pages/Common/Unauthorized';
import ResetPassword from './pages/Auth/ForgotPassword/ResetPassword';

const App: React.FC = () => {
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup' 
                    || location.pathname === '/404' || location.pathname === '/unauth';
  
  useEffect(() => {
    sal({
      root: null,
      threshold: 0.1,
      once: true, // animation only triggers once
    });
  }, []);

  return (
    <>
      {/* <ReactLenis root /> */}
      <Router>
        {/* <Header /> */}
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/unauth" element={<Unauthorized />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>

        {!hideFooter && <Footer />}

      </Router>
    </>
  );
};

export default App;

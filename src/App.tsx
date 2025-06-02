import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ReactLenis } from 'lenis/react'
import sal from 'sal.js';
import 'sal.js/dist/sal.css';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

import HomePage from './pages/Common/Home/Homepage';
import Logout from './Application/Logout';
import Signup from './pages/Auth/Signup/Signup';
import LoginPage from './pages/Auth/Login/Login';
import NotFound from './pages/Common/NotFound'; 
import Dashboard from './pages/Admin/Dashboard';
import Unauthorized from './pages/Common/Unauthorized';
import ResetPassword from './pages/Auth/ForgotPassword/ResetPassword';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import BlogDetails from './pages/Content/Blog/BlogDetails';
import BlogList from './pages/Content/Blog/BlogList';
import BookingForm from './pages/Content/Services/BookingForm';
const App: React.FC = () => {
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup' 
                    || location.pathname === '/404' || location.pathname === '/unauth'
                    || location.pathname === '/dash';
  const hideNav = location.pathname === '/dash';
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
        {!hideNav && <Navbar />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/unauth" element={<Unauthorized />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/booking-form" element={<BookingForm />} />
        </Routes>

        {!hideFooter && <Footer />}

      </Router>
    </>
  );
};

export default App;

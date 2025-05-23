import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ReactLenis } from 'lenis/react'
import sal from 'sal.js';
import 'sal.js/dist/sal.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './Application/Homepage';
import Logout from './Application/Logout';
import Signup from './Application/Signup/Signup';
import LoginPage from './Application/Login/Login';

const App: React.FC = () => {
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';
  
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
        </Routes>

        {!hideFooter && <Footer />}

      </Router>
    </>
  );
};

export default App;

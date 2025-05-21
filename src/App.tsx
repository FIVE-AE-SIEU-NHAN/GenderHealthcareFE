import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './Application/Homepage';
import Logout from './Application/Logout';
import Signup from './Application/Signup';
import LoginPage from './Application/Signin';
import Blog from './Application/Blog';

const App: React.FC = () => {
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <Router>
      {/* <Header /> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={<Blog />} /> 
      </Routes>

      {!hideFooter && <Footer />}

    </Router>
  );
};

export default App;

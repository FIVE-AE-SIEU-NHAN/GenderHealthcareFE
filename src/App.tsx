import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './Application/Homepage';
import Login from './Application/Login';
import Logout from './Application/Logout';
import Register from './Application/Register';
import Blog from './Application/Blog';
import BlogDetail from './Application/BlogDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        {/* Add more routes as needed */} 
        <Route path="/blog/:id" element={<BlogDetail/>} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;

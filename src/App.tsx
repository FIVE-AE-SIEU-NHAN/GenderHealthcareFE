import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './Application/Homepage';
import Logout from './Application/Logout';
import Signup from './Application/Signup';
import LoginPage from './Application/Signin';
import BlogDetails from './Application/BlogDetail';
import BookingService from './Application/BookingService';
import RequireLoginBooking from './Application/RequireLoginBooking';
import ServiceList from './Application/ServiceList';
import ServiceDetail from './Application/ServiceDetail';
import ContactUs from './Application/ContactUs';
import Prescription from './Application/Prescription';

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
        <Route path="/blogdetail" element={<BlogDetails />} />
        <Route path="/bookingservices" element={<BookingService />} />
        <Route path="/requirebookingform" element={<RequireLoginBooking />} />
        <Route path="/servicelist" element={<ServiceList />} />
        <Route path="/servicedetail" element={<ServiceDetail />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/prescription" element={<Prescription />} />
      </Routes>

      {!hideFooter && <Footer />}

    </Router>
  );
};

export default App;

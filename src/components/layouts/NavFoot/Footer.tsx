import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo1.png';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentUrl = encodeURIComponent(window.location.href);

  return (
    <footer className="bg-[#1A2250] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Care4Gender Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-bold text-lg">Care4Gender</h2>
                <p className="text-sm text-blue-200">Gender Healthcare</p>
              </div>
            </div>

            <div className="text-sm text-gray-300 leading-relaxed mb-6">
              <p className="mb-2">
                <span className="text-white font-medium">Care4Gender</span> provides comprehensive <span className="text-blue-300">sexual and reproductive health services</span>
              </p>
              <p className="text-gray-400">
                with professional medical consultation and dedicated support for your wellness journey.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-400 flex-shrink-0" size={14} />
                <a
                  href="tel:+842873005588"
                  className="hover:text-white transition-colors duration-200"
                >
                  +84 28 7300 5588
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400 flex-shrink-0" size={14} />
                <a
                  href="mailto:care4gender@fpt.edu.vn"
                  className="hover:text-white transition-colors duration-200"
                >
                  care4gender@fpt.edu.vn
                </a>
              </div>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" size={14} />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lot+E2a-7+Street+D1+Long+Thanh+My+Thu+Duc+City+Ho+Chi+Minh+City+Vietnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs leading-relaxed hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Lot E2a-7, Street D1, Long Thanh My, Thu Duc City, Ho Chi Minh City
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">
                  + Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white transition-colors duration-200">
                  + Health Articles
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-white transition-colors duration-200">
                  + About Us
                </Link>
              </li>
              <li>
                <Link to="/ask-question" className="hover:text-white transition-colors duration-200">
                  + Ask a Question
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/book-consultant" className="hover:text-white transition-colors duration-200">
                  + Sexual Health Consultation
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors duration-200">
                  + Reproductive Health Care
                </Link>
              </li>            
              <li>
                <Link to="/book-service" className="hover:text-white transition-colors duration-200">
                  + Book an STIS Test
                </Link>
              </li>            
            </ul>
          </div>

          {/* Payment Partner */}
          <div>
            <h3 className="font-semibold text-white mb-4">Payment Partner</h3>
            <div className="mb-4">
              <img
                src="https://payos.vn/docs/img/logo.svg"
                alt="PayOS Logo"
                className="h-12 object-contain bg-white rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA4MCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzAwN0JGRiIvPgo8dGV4dCB4PSI0MCIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIj5QYXlPUzwvdGV4dD4KPHN2Zz4=';
                }}
              />
            </div>
            <p className="text-sm text-gray-400 mb-3">Secure Payments</p>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              We partner with PayOS to ensure your payments are safe, secure, and processed quickly for all our healthcare services.
            </p>

            {/* Operating Hours */}
            <div className="bg-gray-700/30 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-1">Operating Hours</p>
              <p className="text-xs text-blue-200">7:00 AM - 5:00 PM</p>
              <p className="text-xs text-gray-400">Monday - Saturday</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-400">
                Copyright © 2025 <span className="text-red-400 font-semibold">Care4Gender</span>. All Rights Reserved.
              </p>
            </div>

            {/* Center Content */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <p className="text-white font-semibold text-sm text-center">
                Your Health, Our Priority - Professional Care Anytime
              </p>

              <div className="flex items-center gap-3 text-sm text-white">
                <img
                  src={logo}
                  alt="Care4Gender Logo"
                  className="w-8 h-8 object-contain"
                />
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold">Available 7AM - 5PM</p>
                  <p className="text-xs text-gray-300">Online Consultation</p>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Share:</span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-1"
                  title="Share on Facebook"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent("Check out Care4Gender - Professional Gender Healthcare Services!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-200 p-1"
                  title="Share on Twitter"
                >
                  <FaTwitter size={16} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-200 p-1"
                  title="Share on LinkedIn"
                >
                  <FaLinkedinIn size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

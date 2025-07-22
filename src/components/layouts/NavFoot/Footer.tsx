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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img 
              src={logo} 
              alt="Care4Gender Logo" 
              className="w-14 h-14 object-contain"
            />
            <div>
              <h2 className="font-bold text-lg">Care4Gender</h2>
              <p className="text-sm text-blue-200">Gender Healthcare</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            Care4Gender provides comprehensive sexual and reproductive health services with professional medical consultation, dedicated support, and convenient appointment booking for your healthcare journey.
          </p>

          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-400" />
              <span>+84 28 7300 5588</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-400" />
              <span>care4gender@fpt.edu.vn</span>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-blue-400 mt-1" />
              <span>Lot E2a-7, Street D1, D. D1, Long Thanh My, Thu Duc City, Ho Chi Minh City 700000, Vietnam</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-white cursor-pointer transition-colors">+ Home</Link>
            </li>
            <li>
              <Link to="/book-consultant" className="hover:text-white cursor-pointer transition-colors">+ Find Specialist</Link>
            </li>
            <li>
              <Link to="/book-service" className="hover:text-white cursor-pointer transition-colors">+ Book Service</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/book-consultant" className="hover:text-white cursor-pointer transition-colors">+ Sexual Health Consultation</Link>
            </li>
            <li>
              <Link to="/book-service" className="hover:text-white cursor-pointer transition-colors">+ Reproductive Health Care</Link>
            </li>
            <li>
              <Link to="/book-consultant" className="hover:text-white cursor-pointer transition-colors">+ Online Consultation</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="tel:+842873005588" className="hover:text-white cursor-pointer transition-colors">+ Call Us</a>
            </li>
            <li>
              <a href="mailto:care4gender@fpt.edu.vn" className="hover:text-white cursor-pointer transition-colors">+ Email Us</a>
            </li>
          </ul>
          
          <div className="mt-6">
            <h4 className="font-semibold text-white mb-3 text-sm">Payment Partner</h4>
            <div className="flex items-center gap-2">
              <img 
                src="https://payos.vn/docs/img/logo.svg"
                alt="PayOS Logo" 
                className="h-8 object-contain bg-white rounded px-2 py-1"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA4MCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzAwN0JGRiIvPgo8dGV4dCB4PSI0MCIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIj5QYXlPUzwvdGV4dD4KPHN2Zz4=';
                }}
              />
              <span className="text-xs text-gray-400">Secure payments</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <p className="text-sm text-gray-400">
          Copyright © 2025 <span className="text-red-400">Care4Gender</span>. All Rights Reserved.
        </p>

        <div className="flex items-center gap-6">
          <p className="text-white font-semibold text-sm text-center">Your Health, Our Priority - Professional Care Anytime</p>
          <Link to="/book-consultant" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors">
            Book Consultation →
          </Link>
          <div className="flex items-center gap-2 text-sm text-white">
            <span className="bg-blue-400 w-6 h-6 rounded-full flex items-center justify-center">🕒</span>
            <div>
              <p className="text-xs font-semibold">Available 24/7</p>
              <p className="text-xs">Online Consultation</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-400 mt-4 md:mt-0">
          <span>Share:</span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
            title="Share on Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent("Check out Care4Gender - Professional Gender Healthcare Services!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors"
            title="Share on Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            title="Share on LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A2250] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
     
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full" />
            <div>
              <h2 className="font-bold text-lg">Care4Gender</h2>
              <p className="text-sm text-blue-200">Gender Healthcare</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            Medova is a convenience services to the adaptability, Spacious modern villa living room with centrally placed swimming pool blending indoor-outdoor
          </p>

          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-400" />
              <span>+84 090 012 345</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-400" />
              <span>infomail123@domain.com</span>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-blue-400 mt-1" />
              <span>lorem ipsum 72 ffas, fasf fsa f City, fsdafsad Country</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>+ Home</li>
            <li>+ About Us</li>
            <li>+ Services</li>
            <li>+ Our Staff</li>
            <li>+ Term & Conditions</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>+ Lorem ipsum</li>
            <li>+ Lorem ipsum</li>
            <li>+ Lorem ipsum</li>
            <li>+ Lorem ipsum</li>
            <li>+ Lorem ipsum</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>+ Contact Us</li>
            <li>+ Live Chat</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <p className="text-sm text-gray-400">
          Copyright © 2025 <span className="text-red-400">Care4Gender</span>. All Rights Reserved.
        </p>

        <div className="flex items-center gap-6">
          <p className="text-white font-semibold text-sm text-center">Explore Our Comprehensive Healthcare Solutions</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
            Make Appointment →
          </button>
          <div className="flex items-center gap-2 text-sm text-white">
            <span className="bg-white w-6 h-6 rounded-full" /> {/* Clock icon placeholder */}
            <div>
              <p className="text-xs font-semibold">Opening Hour</p>
              <p className="text-xs">09:30AM - 10:30PM</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-400 mt-4 md:mt-0">
          <span>Social Media:</span>
          <FaFacebookF className="hover:text-white cursor-pointer" />
          <FaTwitter className="hover:text-white cursor-pointer" />
          <FaLinkedinIn className="hover:text-white cursor-pointer" />
          <FaInstagram className="hover:text-white cursor-pointer" />
          <FaYoutube className="hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

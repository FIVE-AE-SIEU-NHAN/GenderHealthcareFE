import React from "react";

import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white relative h-170">
      
      {/* Extended blue background behind content */}
      <div className="absolute top-0 w-full h-80 bg-[#6E7BF2] rounded-b-[40px] z-0"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto pt-20 grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-12">
        {/* Left: Offices */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Offices</h2>

          <div className="mb-4">
            <h3 className="font-semibold">Ha Noi</h3>
            <p className="text-sm text-gray-600">123, abc xyz, acbbca, xxxxxx</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Ho Chi Minh</h3>
            <p className="text-sm text-gray-600">123, abc xyz, acbbca, xxxxxx</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold">Can Tho</h3>
            <p className="text-sm text-gray-600">123, abc xyz, acbbca, xxxxxx</p>
          </div>

          <div className="flex space-x-4 text-xl">
            <a href="#" className="text-blue-600"><i></i><FaFacebook /></a>
            <a href="#" className="text-blue-600"><i ></i><LuInstagram /></a>
            <a href="#" className="text-blue-600"><i></i><FaXTwitter /></a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-1/2 border-b border-gray-400 focus:outline-none text-sm"
              />
              <input
                type="email"
                placeholder="Enter a valid email address"
                className="w-1/2 border-b border-gray-400 focus:outline-none text-sm"
              />
            </div>

            <input
              type="tel"
              placeholder="Enter your phone (e.g +84 123 321 999)"
              className="w-full border-b border-gray-400 focus:outline-none text-sm"
            />

            <textarea
              placeholder="Message"
              className="w-full border-b border-gray-400 focus:outline-none resize-none h-24 text-sm"
            ></textarea>

            <div className="flex items-center text-sm">
              <input type="checkbox" id="terms" className="mr-2 accent-blue-500" />
              <label htmlFor="terms">
                I accept the <a href="#" className="text-blue-500 underline">Terms of Services</a>
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 bg-[#6E7BF2] text-white text-sm font-semibold px-6 py-2 rounded-full shadow-md hover:bg-[#5a66d1] transition"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
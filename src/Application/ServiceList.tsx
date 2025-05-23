import React from "react";

import { FaSyringe, FaPhone } from "react-icons/fa6";
import { PiHandHeartFill } from "react-icons/pi";
import { MdFamilyRestroom } from "react-icons/md";
import { BsChatHeartFill } from "react-icons/bs";

const ServicesPage: React.FC = () => {
  return (
    <div className='font-sans text-gray-800'>
      <div
        className="bg-cover bg-no-repeat pb-10"
        style={{ backgroundImage: "url('/images/backgroundService.png')" }}
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-8 px-4">
          {/* Left Column - Services (70%) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-5xl text-blue-900 text-center mt-10 font-bold">
              SERVICES
            </div>
            <p className="text-blue-700 text-lg text-center mb-10 font-semibold">
              Diverse and Specialized Sexual Health Solutions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 shadow-lg rounded-xl hover:shadow-2xl transition duration-300 border-t-4 border-blue-600">
                <div className="text-3xl mb-4">🧬</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Reproductive health care services
                </h3>
                <p className="text-blue-600 mb-4">Professional Guidance for Reproductive Well-being</p>
                <button className="text-blue-800 font-semibold hover:underline">View service →</button>
              </div>

              <div className="bg-white p-6 shadow-lg rounded-xl hover:shadow-2xl transition duration-300 border-t-4 border-blue-600">
                <div className="text-4xl mb-4 ml-2 text-[#1A3973]"><FaSyringe /></div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Counseling and testing for sexually transmitted diseases (STIs/STDs)
                </h3>
                <p className="text-blue-600 mb-4">Comprehensive STI Testing with Expert Guidance</p>
                <button className="text-blue-800 font-semibold hover:underline">View service →</button>
              </div>

              <div className="bg-white p-6 shadow-lg rounded-xl hover:shadow-2xl transition duration-300 border-t-4 border-blue-600">
                <div className="text-4xl mb-4 ml-2 text-[#1A3973]"><PiHandHeartFill /></div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Advice and support on gender and sexual health
                </h3>
                <p className="text-blue-600 mb-4">Support and Guidance for Gender and Sexual Health</p>
                <button className="text-blue-800 font-semibold hover:underline">View service →</button>
              </div>

              <div className="bg-white p-6 shadow-lg rounded-xl hover:shadow-2xl transition duration-300 border-t-4 border-blue-600">
                <div className="text-4xl mb-4 ml-2 text-[#1A3973]"><MdFamilyRestroom /></div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Family planning & contraception
                </h3>
                <p className="text-blue-600 mb-4">Empowering Choices in Family Planning and Contraception</p>
                <button className="text-blue-800 font-semibold hover:underline">View service →</button>
              </div>

              <div className="bg-white p-6 shadow-lg rounded-xl hover:shadow-2xl transition duration-300 border-t-4 border-blue-600">
                <div className="text-4xl mb-4 ml-2 text-[#1A3973]"><BsChatHeartFill /></div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Counseling and treatment of sexual dysfunction
                </h3>
                <p className="text-blue-600 mb-4">Confidential Counseling for Sexual Health and Function</p>
                <button className="text-blue-800 font-semibold hover:underline">View service →</button>
              </div>

              <div className="bg-white p-6 shadow-lg rounded-xl hover:shadow-2xl transition duration-300 border-t-4 border-blue-600">
                <div className="text-4xl mb-4 ml-2 text-[#1A3973]"><FaPhone /></div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Online consulting & support services
                </h3>
                <p className="text-blue-600 mb-4">Connect Online with Professional Support Today</p>
                <button className="text-blue-800 font-semibold hover:underline">View service →</button>
              </div>
            </div>
          </div>

          {/* Right Column - Image (30%) */}
          <div className="lg:col-span-3 hidden lg:block">
            <img
              src="/images/bacsi4.png"
              alt="Service Visual"
              className="rounded-xl w-full h-full object-cover max-h-[800px]"
            />
          </div>
        </div>
      </div>

      {/* Login */}
      <div className="text-sm text-[#1C2359] font-bold text-center m-4">
        <p className="text-sm text-[#1C2359] font-bold text-center mb-5">
          Please log in or register to use sexual health care and counseling services.
        </p>
        <div className="gap-3 flex justify-center items-center">
          <a
            href="/login"
            className="bg-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-800 transition duration-200 font-semibold"
          >
            Log In
          </a>
          <p className="flex items-center my-0 text-[#4A4A4A] font-semibold">or</p>
          <a
            href="/signup"
            className="border-2 border-dark-blue text-dark-blue px-4 py-2 rounded-button hover:bg-blue-50 transition duration-200 font-semibold"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

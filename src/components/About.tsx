import React from "react";
import { FaCheckCircle, FaPhoneAlt, FaArrowRight } from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-white py-12 px-6 md:px-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row gap-10">

          <div className="lg:w-1/2 space-y-6">
            <p className="text-pink-500 font-semibold uppercase tracking-wide">
              About Us
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              Expert Doctors, <span className="text-blue-700">Seamless</span>
              <br />
              Appointments, Quality Care
            </h2>

            <div className="flex flex-col md:flex-row gap-6 items-stretch">

              <div className="md:w-4/12 rounded-lg overflow-hidden shadow-md">
                <img
                  src="/images/bacsi1.jpg"
                  alt="Hospital hallway"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-9/12 flex flex-col justify-between">
                <p className="text-gray-600 text-justify">
                  We believe that knowledge is power. We connect our patients
                  directly with their results so they have valuable health
                  information when they need it most. We care about our people
                  and are committed to your well-being.
                </p>

                <ul className="space-y-3 mt-4">
                  {[
                    "Specialized Care for a Healthier You",
                    "Expert Guidance for Optimal Wellness",
                    "Personalized Treatment Plans for Every Patient",
                    "Cutting-Edge Technology for Superior Healthcare",
                    "Innovative Solutions for Enhanced Patient Outcomes",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <FaCheckCircle className="text-blue-600 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-6 pt-6">
                  <button className="bg-blue-900 text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-blue-800 transition">
                    More About Us <FaArrowRight />
                  </button>
                  <div className="flex items-center text-pink-600 font-semibold">
                    <FaPhoneAlt className="mr-2" />
                    +00 (123) 456789 00
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col items-center gap-6">
            <div className="w-4/5 h-72 rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/bacsi3.jpg"
                alt="Doctor consulting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-4/5 h-72 rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/bacsi3.jpg"
                alt="Nurse with patient"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

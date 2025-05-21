import React from "react";
import { FaArrowRight, FaHeartbeat } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import VideoPopup from "./VidModal";

const About = () => {
  return (
    <section className="py-12 px-4 md:px-12">
      <div>
        <div className="flex flex-col lg:flex-row gap-10 mx-4 md:mx-12 lg:mx-28">
          <div className="lg:w-1/1 space-y-3">
            <p className="section-text flex gap-4 items-center">
              <FaHeartbeat /> ABOUT US
            </p>
            <h2 className="text-shadow-md font-outfit text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue leading-snug">
              Expert Doctors,
              <span className="font-semibold"> Seamless, Appointments, Quality Care</span>
              <br />
            </h2>
            <div className="flex flex-col md:flex-row gap-12 items-stretch">
              <div className="w-full md:w-4/12 rounded-lg overflow-hidden shadow-md">
                <VideoPopup />
              </div>

              <div className="w-full md:w-9/12 flex flex-col justify-between text-shadow-md">
                <p className="text-gray-600 text-justify sm:text-2xl md:text-xl">
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
                      className="ml-16 flex items-start gap-2 text-dark-blue font-medium sm:text-lg md:text-xl lg:text-2xl max-w-[calc(100vw-80px)]"
                    >
                      <IoMdCheckmarkCircleOutline className="mt-2 text-blue-700" />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 font-medium">
                  <button className="bg-semi-dark-blue text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-blue-800 transition">
                    More About Us <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 flex flex-col items-center gap-6">
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/ab1.webp"
                alt="Doctor consulting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-72 rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/ab2.webp"
                alt="Nurse with patient"
                className="w-full h-full object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

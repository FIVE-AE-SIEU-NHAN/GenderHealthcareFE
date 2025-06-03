import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaHeartbeat } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";

const ServiceDetail: React.FC = () => {
  return (
    <div className='font-sans text-gray-800'>
      {/* Banner */}
      <section
        className="py-12 text-center bg-cover bg-center h-[350px] relative flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/images/Banner.png')" }}
      >
        {/* Color overlay with #1A2159 at 70% opacity */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: "#1A2159", opacity: 0.7 }}
        ></div>
        
        {/* Content needs to be above the overlay */}
        <h2 className="text-5xl text-white font-bold relative z-10">Services</h2>
        <p className="text-sm mt-2 relative z-10">
          <span className="text-white">Services</span>
          <span style={{ color: "#55AEFF" }}> / ServiceDetail</span>
        </p>
      </section>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto mt-10 pb-16 px-4 space-y-6'>  
        <h1 className='text-4xl font-bold text-[#030D43]'>
          Professional Medical Service Of Health & Wellness Solutions
        </h1>

        {/* Two-column layout instead of just image */}
        <div className='flex flex-col lg:flex-row gap-8 items-stretch'>
          <div className='w-full lg:w-1/2 h-auto'>
            <img 
              src='/images/bs2.webp' 
              alt='Service' 
              className='rounded-3xl w-full h-full object-cover shadow-lg' 
              style={{ height: '100%' }}
            />
          </div>
          <div className='w-full lg:w-1/2 space-y-4'>
            <h2 className='text-2xl font-bold text-[#030D43]'>Innovative Healthcare Solutions</h2>
            <p className='text-gray-700 leading-relaxed'>
              Advancements in technology are revolutionizing the healthcare industry, improving patient outcomes and making medical services more accessible. Telemedicine allows patients to consult with
              doctors remotely, reducing wait times and increasing convenience.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              Artificial Intelligence (AI) is enhancing diagnostic accuracy, while wearable health devices help monitor vital signs in real time.
              These innovations not only improve efficiency but also play a crucial role in early disease detection and personalized treatment plans.
            </p>
            <div className='pt-2'>
              <Link to={"/booking-form"}>
                <Button className="bg-[#1A3973] hover:bg-[#2A59A3] transition-colors text-white text-lg font-semibold rounded-md px-10 py-6 shadow-lg transform hover:scale-105">
                  Book This Service
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className='text-sm text-gray-700 leading-relaxed space-y-4 pt-4'>
          <p>
            Preventive healthcare is the key to long-term well-being. Regular check-ups, screenings, and vaccinations help detect potential health issues early, allowing for timely intervention and reducing the risk of serious illnesses. Simple lifestyle changes such
            as maintaining a balanced diet, staying active, and managing stress contribute significantly to disease prevention.
          </p>

          <div className='flex flex-col md:flex-row gap-6 items-stretch'>
            <div className='w-full md:w-3/5'>
              <img
                src="/images/bs2.webp"
                alt="Service detail"
                className='rounded-3xl w-full h-full object-cover'
              />
            </div>
            <div className='w-full md:w-2/5 space-y-3'>
              <div className='flex items-start gap-2 mb-5'>
                <p>
                  Our expert skill and excellent patient service. If co-management for an ocular disease, such
                  as macular degeneration, cataracts or glaucoma to keep watch on your eye health and prevent
                  future vision loss.
                </p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1 flex-shrink-0' />
                <p>Advancements in technology are revolutionizing the healthcare industry, improving patient outcomes and making medical services.</p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1 flex-shrink-0' />
                <p>Hypertension, commonly known as high blood pressure, often develops without noticeable symptoms, making it a "silent killer."</p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1 flex-shrink-0' />
                <p>Preventive healthcare is the key to long-term well-being. Regular check-ups, screenings, and vaccinations help detect potential health issues early</p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1 flex-shrink-0' />
                <p>Managing hypertension involves regular monitoring, adopting a heart-healthy diet, reducing sodium intake, engaging in physical activity.</p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1 flex-shrink-0' />
                <p>Modern equipment and techniques to provide accurate diagnosis and effective treatment plans, engaging in physical activity.</p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1 flex-shrink-0' />
                <p>A well-balanced diet plays a crucial role in preventing chronic diseases such as diabetes, obesity, and heart disease.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className='text-3xl font-bold text-[#030D43] mb-3'>
            How do I get eye infections and solutions?
          </h1>
          <p>
            Preventive healthcare is the key to long-term well-being. Regular check-ups, screenings, and vaccinations help detect potential health issues early, allowing for timely intervention and reducing
            the risk of serious illnesses. Simple lifestyle changes such as maintaining a balanced diet, staying active, and managing stress contribute significantly to disease prevention. Investing in
            preventive care today ensures a healthier future and lowers healthcare costs in the long run. If you need co-management for an ocular disease, such as macular degeneration, cataracts or
            glaucoma to keep watch on your eye health and prevent future vision loss.
          </p>
        </div>

        <div className='bg-[#F2F3FC] flex flex-col md:flex-row rounded-lg overflow-hidden'>
          <div className='w-full md:w-2/5 h-auto'>
            <img 
              src="/images/bs2.webp" 
              alt="Emergency care" 
              className='w-full h-full object-cover' 
            />
          </div>
          <div className='w-full md:w-3/5 p-5'>
            <div className='flex items-center gap-2 py-5'>
              <FaHeartbeat className='text-[#1977CC]' />
              <p className='text-[#1977CC]'>SPECIAL CARE FREE DOCTOR CONSULTATION</p>
            </div>
            <p className='text-3xl text-[#030D43]'>Emergency</p>
            <div className='text-3xl font-bold text-[#030D43] mb-3'>
              Medical Care 24/7
            </div>
            <p className='my-5'>
              Treatment for an eye disease or condition, you'll benefit from our expert skill
              and excellent patient service. If co-management for an ocular disease, such as
              macular degeneration, cataracts or glaucoma to keep watch on your eye health
              and prevent future vision loss.
            </p>
            <div className="flex items-center gap-4">
              <Link to={"/bookingservices"}>
                <Button className="bg-[#1A3973] hover:bg-[#2A59A3] transition-colors text-white text-lg font-semibold rounded-md px-10 py-6 shadow-lg transform hover:scale-105">
                  Book An Appointment
                </Button>
              </Link>

              <div className="h-10 w-10 rounded-full bg-[#1A3973] flex items-center justify-center">
                <FaSquarePhone className="text-white text-xl" />
              </div>

              <div className="flex flex-col">
                <div className='font-semibold'>Or Book on Call</div>
                <div className="font-semibold">+00 (123) 456789 00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;

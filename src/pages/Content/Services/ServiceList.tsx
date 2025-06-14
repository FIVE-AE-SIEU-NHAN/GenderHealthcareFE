// src/pages/Content/Services/ServiceList.tsx

import React from 'react';
import { ArrowRight, HeartPulse, TestTube, Users, Stethoscope, MessageSquare, Phone } from 'lucide-react';
import backgroundImage from '@/assets/images/ser-bg.png';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center h-full border-t-4" style={{ borderTopColor: '#1C2359' }}>
    <div className="text-brand-light-blue mb-5">{icon}</div>

    <h3 className="text-lg font-bold mb-3 text-center" style={{ color: '#1C2359' }}>
      {title}
    </h3>

    <p className="text-brand-gray text-sm mb-6 text-center flex-grow">
      {description}
    </p>

    <div className="flex gap-3 mt-auto w-full">
      <a
        href="#"
        className="whitespace-nowrap flex-1 inline-flex items-center justify-center px-4 py-3 rounded-2xl border-2 font-medium transition-all duration-300 ease-in-out hover:bg-[#1C2359] hover:text-white hover:scale-105 hover:shadow-lg group text-center"
        style={{
          borderColor: '#1C2359',
          backgroundColor: 'transparent',
          color: '#1C2359'
        }}
      >
        View service
        <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
      </a>

      <a
        href="#"
        className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-2xl border-2 font-medium hover:bg-transparent hover:text-[#1C2359] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg group text-center"
        style={{
          borderColor: '#1C2359',
          backgroundColor: '#1C2359',
          color: 'white'
        }}
      >
        Booking
        <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  </div>
);

const servicesData: ServiceCardProps[] = [
  {
    icon: <HeartPulse size={36} strokeWidth={1.5} />,
    title: 'Reproductive health care services',
    description: 'Professional Guidance for Reproductive Well-being',
  },
  {
    icon: <TestTube size={36} strokeWidth={1.5} />,
    title: 'Counseling and testing for sexually transmitted diseases (STIs/STDs)',
    description: 'Comprehensive STI Testing with Expert Guidance',
  },
  {
    icon: <MessageSquare size={36} strokeWidth={1.5} />,
    title: 'Advice and support on gender and sexual health',
    description: 'Support and Guidance for Gender and Sexual Health',
  },
  {
    icon: <Users size={36} strokeWidth={1.5} />,
    title: 'Family planning & contraception',
    description: 'Empowering Choices in Family Planning and Contraception',
  },
  {
    icon: <Stethoscope size={36} strokeWidth={1.5} />,
    title: 'Counseling and treatment of sexual dysfunction',
    description: 'Confidential Counseling for Sexual Health and Function',
  },
  {
    icon: <Phone size={36} strokeWidth={1.5} />,
    title: 'Online consulting & support services',
    description: 'Connect Online with Professional Support Today',
  },
];

const ServiceList: React.FC = () => {
  return (
    <>
      <section
        className="py-12 text-center bg-cover bg-center h-[330px] relative flex flex-col items-center justify-center bg-[url('@/assets/images/blog1.jpg')]"
      >
        <h2 className="text-5xl text-white font-bold">Services</h2>
        <p className="text-sm mt-2">
          <span className="text-white">Home</span>
          <span style={{ color: "#55AEFF" }}> / Services List</span>
        </p>
      </section>

      <section
        className="relative bg-brand-bg-light py-20 lg:py-28 bg-cover bg-center bg-no-repeat 2xl:h-[calc(103vh)]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide" style={{ color: '#1C2359' }}>
              OUR SERVICES
            </h1>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
              Diverse and Specialized Sexual Health Solutions.
            </p>
          </div>

          <div className="flex items-center justify-center lg:-mt-11">
          {/* relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:mb-13.5 2xl:mr-16 2xl:max-w-[75%]  */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:mb-13.5 2xl:max-w-[75%]">
              {servicesData.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceList;

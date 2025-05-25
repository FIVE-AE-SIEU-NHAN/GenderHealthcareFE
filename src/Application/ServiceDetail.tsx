import React from 'react';

import { Button } from "@/components/ui/button";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaHeartbeat } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";

const ServiceDetail: React.FC = () => {
  return (
    <div className='font-sans text-gray-800 '>
      {/* Banner */}
      <section className='bg-blue-100 py-0 text-center'>
        <div className='relative w-full'>
          <img src='/images/banner_blog.png' alt='' className='rounded w-full' />
          <div className='absolute inset-0 w-full bg-[#1A2159]/70 flex flex-col items-center justify-center'>
            <h2 className='text-6xl font-bold text-white'>Service Detail</h2>
            <p className='text-sm mt-3'>
              <span className='text-white'>Home</span>
              <span className='text-[#55AEFF]'> &gt; Services &gt; BookingService</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto mt-10 pb-16 px-4 space-y-6'>
        <h1 className='text-4xl font-bold text-[#030D43]'>
          Professional Medical Service Of Health & Wellness Solutions
        </h1>

        <div>
          <img src='/images/imgService.png' alt='Service' className='rounded-3xl w-full' />
        </div>

        <div className='text-sm text-gray-700 leading-relaxed space-y-4'>
          <p>
            Advancements in technology are revolutionizing the healthcare industry, improving patient outcomes and making medical services more accessible. Telemedicine allows patients to consult with
            doctors remotely, reducing wait times and increasing convenience. Artificial Intelligence (AI) is enhancing diagnostic accuracy, while wearable health devices help monitor vital signs in real time.
            These innovations not only improve efficiency but also play a crucial role in early disease detection and personalized treatment plans. Preventive healthcare is the key to long-term well-being.
            Regular check-ups, screenings, and vaccinations help detect potential health issues early, allowing for timely intervention and reducing the risk of serious illnesses. Simple lifestyle changes such
            as maintaining a balanced diet, staying active, and managing stress contribute significantly to disease prevention.
          </p>

          <div className='flex gap-6 items-stretch'>
            <div className='w-3/5'>
              <img
                src="/images/ab1.webp"
                alt="Service detail"
                className='rounded-3xl w-full h-full object-cover'
              />
            </div>
            <div className='w-2/5 space-y-3'>
              <div className='flex items-start gap-2 mb-5'>
                <p>
                  Our expert skill and excellent patient service. If co-management for an ocular disease, such
                  as macular degeneration, cataracts or glaucoma to keep watch on your eye health and prevent
                  future vision loss.
                </p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1' />
                <p>Advancements in technology are revolutionizing the healthcare industry, improving patient outcomes and making medical services.</p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1' />
                <p>Hypertension, commonly known as high blood pressure, often develops without noticeable symptoms, making it a "silent killer."</p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1' />
                <p>Preventive healthcare is the key to long-term well-being. Regular check-ups, screenings, and vaccinations help detect potential health issues early</p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1' />
                <p>Managing hypertension involves regular monitoring, adopting a heart-healthy diet, reducing sodium intake, engaging in physical activity.</p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1' />
                <p>Modern equipment and techniques to provide accurate diagnosis and effective treatment plans, engaging in physical activity.</p>
              </div>
              <div className='flex items-start gap-2 '>
                <IoMdCheckmarkCircleOutline className='text-[#1977CC] w-10 h-10 mt-1' />
                <p>A well-balanced diet plays a crucial role in preventing chronic diseases such as diabetes, obesity, and heart disease.</p>
              </div>
            </div>
          </div>

        </div>
        <div>
            <h1 className='text-3xl font-bold text-[#030D43] mb-3 '>
            How do i get eye infections and solutions?
             </h1>
            <p>
                Preventive healthcare is the key to long-term well-being. Regular check-ups, screenings, and vaccinations help detect potential health issues early, allowing for timely intervention and reducing
                the risk of serious illnesses. Simple lifestyle changes such as maintaining a balanced diet, staying active, and managing stress contribute significantly to disease prevention. Investing inh
                preventive care today ensures a healthier future and lowers healthcare costs in the long run. If you need co-management for an ocular disease, such as macular degeneration, cataracts or
                glaucoma to keep watch on your eye health and prevent future vision loss.
            </p>
        </div>
        <div className='bg-[#F2F3FC] flex p-5 rounded-lg'>
            <div className='w-2/5'>
                <img src="/public/images/ab1.webp" className='p-5'/>
            </div>
            <div className='w-3/5'>
                <div className='flex items-center gap-2 py-5'>
                    <FaHeartbeat className='text-[#1977CC]' />
                    <p className=' text-[#1977CC]'>SPECIAL CARE FREE DOCTOR CONSULTATION</p> 
                </div>
                <p className='text-3xl text-[#030D43]'>Emergency</p>
                <div className='text-3xl font-bold text-[#030D43] mb-3'>
                     Medical Care 24/7
                </div>
                <p className='my-5'>
                    Treatment for an eye disease or condition, you'll benefit from our expert skill
                    and excellent patient service. If  co-management for an ocular disease, such as
                    macular degeneration, cataracts or glaucoma to keep watch on your eye health
                    and prevent future vision loss.
                </p>
                <div className="flex items-center gap-4">
                    <Button type="submit" className="bg-[#1A3973] text-white font-semibold rounded-sm">
                        Book An Appointment 
                    </Button>
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

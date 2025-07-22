import React from 'react'
import { FaArrowRight, FaHeartbeat } from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import VideoPopup from '@/components/layouts/VidModal'
import about1 from '@/assets/images/ab1.webp'
import about2 from '@/assets/images/ab2.webp'

const About = () => {
  return (
    <section className='mt-7 mb-12 overflow-hidden px-4 py-12 md:px-12'>
      <div>
        <div className='mx-4 flex flex-col gap-10 md:mx-12 lg:mx-28 lg:flex-row'>
          <div className='space-y-3 lg:w-1/1'>
            <p className='section-text flex items-center gap-4' data-sal='fade' data-sal-duration='500'>
              <FaHeartbeat /> ABOUT US
            </p>

            <h2
              className='font-outfit text-dark-blue max-w-200 text-2xl leading-snug text-shadow-md sm:text-3xl md:text-4xl lg:text-5xl'
              data-sal='slide-up'
              data-sal-duration='700'
              data-sal-delay='100'
            >
              Expert Doctors,
              <span className='font-semibold'> Seamless, Appointments, Quality Care</span>
              <br />
            </h2>

            <div
              className='mt-12 flex flex-col items-stretch gap-12 md:flex-row'
              data-sal='slide-left'
              data-sal-duration='600'
            >
              <div
                className='w-full overflow-hidden rounded-lg shadow-md md:w-4/12'
                data-sal='zoom-in'
                data-sal-duration='600'
              >
                <VideoPopup />
              </div>

              <div
                className='flex w-full flex-col justify-between text-shadow-md md:w-9/12'
                data-sal='slide-right'
                data-sal-duration='600'
              >
                <p className='text-justify text-gray-600 sm:text-2xl md:text-xl'>
                  We believe that knowledge is power. We connect our patients directly with their results so they have
                  valuable health information when they need it most. We care about our people and are committed to your
                  well-being.
                </p>

                <ul className='mt-4 space-y-3'>
                  {[
                    'Specialized Care for a Healthier You',
                    'Expert Guidance for Optimal Wellness',
                    'Personalized Treatment Plans for Every Patient',
                    'Cutting-Edge Technology for Superior Healthcare',
                    'Innovative Solutions for Enhanced Patient Outcomes'
                  ].map((item, index) => (
                    <li
                      key={index}
                      className='text-dark-blue ml-16 flex max-w-[calc(100vw-80px)] items-start gap-2 font-medium sm:text-lg md:text-xl lg:text-2xl'
                      data-sal='fade'
                      data-sal-duration='500'
                      data-sal-delay={`${index * 100}`}
                    >
                      <IoMdCheckmarkCircleOutline className='mt-2 text-blue-700' />
                      <span className='line-clamp-1'>{item}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className='flex flex-col items-start gap-4 pt-6 font-medium sm:flex-row sm:items-center'
                  data-sal='slide-up'
                  data-sal-duration='600'
                  data-sal-delay='200'
                >
                  <button className='bg-semi-dark-blue flex items-center gap-2 rounded-md px-6 py-3 text-white shadow-lg transition duration-200 ease-in-out hover:scale-102 hover:bg-[#131045] hover:shadow-[0_3px_9px_#0000003a] active:translate-y-[3.5px]'>
                    More About Us <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-6 lg:w-2/4'>
            <div
              className='h-86 w-full rounded-lg shadow-md'
              data-sal='slide-left'
              data-sal-duration='800'
              data-sal-delay='200'
            >
              <img src={about1} alt='Doctor consulting' className='h-full w-full object-cover' />
            </div>
            <div
              className='h-86 w-full rounded-lg shadow-md'
              data-sal='slide-left'
              data-sal-duration='800'
              data-sal-delay='350'
            >
              <img src={about2} alt='Nurse with patient' className='h-full w-full object-cover shadow-md' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

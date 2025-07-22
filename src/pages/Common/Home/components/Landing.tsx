import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import slide1 from '@/assets/images/bs1.webp'
// import slide2 from '@/assets/images/bs2.webp';
import slide3 from '@/assets/images/bs3.webp'

import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const ToTop = () => window.scrollTo({ top: 0 })

const Home: React.FC = () => {
  const sharedButtons = [
    {
      text: 'Find a Specialist',
      link: '/book-consultant',
      color: 'bg-semi-dark-blue text-white hover:bg-blue-900'
    },
    {
      text: 'Meet Our Doctors',
      link: '/book-service',
      color: 'border-2 border-white text-white hover:bg-white hover:text-semi-dark-blue'
    }
  ]

  const slides = [
    {
      heading: 'Comprehensive Sexual Health Care',
      title: 'Protect your health — anytime, anywhere',
      description: 'Professional consultation and care for reproductive and sexual health from top doctors.',
      image: slide1, // Your local asset
      buttons: sharedButtons
    },
    {
      heading: 'Dedicated and Experienced Medical Team',
      title: 'Meet Our Expert Specialists',
      description:
        'Wholehearted support, attentive listening, and companionship through every stage of your health journey.',
      image: '/images/bs2.webp', // Existing image path
      buttons: sharedButtons
    },
    {
      heading: 'Convenient Appointment Booking',
      title: 'Book an Appointment in Just a Few Steps',
      description: 'Choose your doctor, pick a suitable time, and start your healthcare journey today.',
      image: slide3, // Your local asset
      buttons: sharedButtons
    }
  ]

  return (
    <section id='home' className='relative h-screen w-full'>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect='fade'
        autoplay={{ delay: 3000 }}
        loop
        pagination={{ clickable: true }}
        className='h-[calc(100dvh-59px)] w-full'
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className='relative h-full w-full'>
            <div
              className='absolute inset-0 bg-cover bg-center bg-no-repeat sm:bg-[center_top] lg:bg-center'
              style={{
                backgroundImage: `url(${slide.image})`,
                zIndex: 0
              }}
            />
            <div className='absolute inset-0 z-10 bg-black/50' /> {/* Màu nền tối */}
            {/* Content container - Centered vertically */}
            <div className='relative z-20 flex h-full flex-col justify-center py-20 pr-4 pl-6 text-white lg:pl-25'>
              <div className='max-w-3xl'>
                {/* Text Content + Buttons together */}
                <div className='space-y-4'>
                  <div className='space-y-6'>
                    <h3 className='text-left text-3xl leading-[0.9] font-black text-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
                      {slide.heading}
                    </h3>
                    <h1 className='text-left text-xl leading-tight font-semibold opacity-95 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
                      {slide.title}
                    </h1>
                    <p className='max-w-2xl text-left text-base leading-relaxed font-light opacity-90 sm:text-lg md:text-xl lg:text-2xl'>
                      {slide.description}
                    </p>
                  </div>

                  {/* Buttons - Fixed position with short gap */}
                  <div className='pt-4'>
                    <div className='flex flex-wrap gap-4 sm:gap-6'>
                      {slide.buttons.map((button, btnIndex) => (
                        <Link
                          onClick={ToTop}
                          key={btnIndex}
                          to={button.link}
                          className={`rounded-xl px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 sm:px-8 sm:py-4 sm:text-base lg:text-lg ${button.color} transform hover:scale-105 hover:shadow-xl`}
                        >
                          {button.text}
                          <FaArrowRightLong className='ml-2 inline-block sm:ml-4' />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Home

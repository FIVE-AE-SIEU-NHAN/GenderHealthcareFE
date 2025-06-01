import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import slide1 from '@/assets/images/bs1.webp';
// import slide2 from '@/assets/images/bs2.webp';
import slide3 from '@/assets/images/bs3.webp';



import { FaArrowRightLong } from "react-icons/fa6";

const Home: React.FC = () => {
  const sharedButtons = [
    {
      text: 'Find a Consultant',
      link: '#consultant',
      color: 'text-xl bg-semi-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-900 transition duration-200 font-semibold',
    },
    {
      text: 'Meet Our Doctors',
      link: '#doctors',
      color: 'text-xl border-2 border-white text-white px-4 py-2 rounded-button font-semibold',
    },
  ];

  const slides = [
    {
      heading: "Ipsum Lorem",
      title: 'lorem ipsum lorem ipsum lorem ipsumlorem ipsum',
      description: 'Discover new ways to live healthier and happier.', 
      image: slide1,
      buttons: sharedButtons
    },
    {
      heading: 'Aenean luctus lobortis tellus',
      title: 'New Lifestyle',
      description: 'Discover new ways to live healthier and happier.',
      image: "/images/bs2.webp", 
      buttons: sharedButtons
    },
    {
      heading: 'Pellentesque nec libero nisi',
      title: 'Your Health Benefits',
      description: 'Learn how to maximize your wellness and benefits.',
      image: slide3,
      buttons: sharedButtons
    },
  ];

  return (
    <section id="home" className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000 }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-[calc(100dvh-63px)]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative w-full h-full"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:bg-[center_top] lg:bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                zIndex: 0,
              }}
            />
            <div className="absolute inset-0 bg-black/45 z-10" /> {/* Màu nền tối */}
            <div className="lg:text-left relative z-20 flex flex-col items-center justify-center h-full text-white px-4 space-y-4 max-w-2xl ml-25">
              <h3 className="text-3xl sm:text-5xl lg:text-7xl text-center font-black">
                {slide.heading}
              </h3>
              <h1 className="text-xl sm:text-3xl lg:text-5xl text-center font-medium w-full">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg max-w-md mx-auto">
                {slide.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {slide.buttons.map((button, btnIndex) => (
                  <a
                    key={btnIndex}
                    href={button.link}
                    className={`text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-2 md:py-3 rounded transition ${button.color}`}
                  >
                    {button.text}
                    <FaArrowRightLong className="inline-block ml-3 sm:ml-4" />
                  </a>
                ))}
              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Home;

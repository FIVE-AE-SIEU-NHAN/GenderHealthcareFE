import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import { FaArrowRightLong } from "react-icons/fa6";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Home: React.FC = () => {
  const sharedButtons = [
  {
    text: 'Find a Consultant',
    link: '#consultant',
    color: 'bg-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-900 transition duration-200 font-semibold',
  },
  {
    text: 'Meet Our Doctors',
    link: '#doctors',
    color: 'border-2 border-white text-white px-4 py-2 rounded-button font-semibold',
  },
];
  
  const slides = [
    {
      heading: "Ipsum Lorem",
      title: 'lorem ipsum lorem ipsum lorem ipsumlorem ipsum',
      description: '', // đoạn giới thiệu 10-15 chữ
      buttons: sharedButtons
    },
    {
      heading: 'Aenean luctus lobortis tellus',
      title: 'New Lifestyle',
      description: 'Discover new ways to live healthier and happier.',
      buttons: sharedButtons
    },
    {
      heading: 'Pellentesque nec libero nisi',
      title: 'Your Health Benefits',
      description: 'Learn how to maximize your wellness and benefits.',
      buttons: sharedButtons
    },
  ];

  return (
    <section id="home" className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        // autoplay={{ delay: 5000 }}
        autoplay={false}
        loop
        pagination={{ clickable: true }}
        className="w-full h-[861px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative w-full h-full"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(/images/bs${index + 1}.webp)`,
                zIndex: 0,
              }}
            />
            <div className="absolute inset-0 bg-black/55 z-10" /> {/* Màu nền tối */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 space-y-4 max-w-2xl ml-25">
              <h3 className="text-7xl text-center font-black">{slide.heading}</h3>
              <h1 className="text-5xl text-center font-medium w-[105%]">{slide.title}</h1>
              <p className="text-md md:text-lg max-w-md mx-auto">{slide.description}</p> {/* Đoạn giới thiệu */}
              <div className="flex gap-4 mt-4">
                {slide.buttons.map((button, btnIndex) => (
                  <a
                    key={btnIndex}
                    href={button.link}
                    className={`inline-block px-6 py-3 rounded transition ${button.color}`}
                  >
                    {button.text}
                    <FaArrowRightLong className="inline-block ml-5" />
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

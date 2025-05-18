import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Home: React.FC = () => {
  const slides = [
    {
      heading: "Let's make your life happier",
      title: 'Healthy Living',
      button: {
        text: 'Meet Our Doctors',
        link: '#team',
        color: 'bg-teal-500 hover:bg-blue-800',
      },
    },
    {
      heading: 'Aenean luctus lobortis tellus',
      title: 'New Lifestyle',
      button: {
        text: 'More About Us',
        link: '#about',
        color: 'bg-teal-500 hover:bg-blue-800 ',
      },
    },
    {
      heading: 'Pellentesque nec libero nisi',
      title: 'Your Health Benefits',
      button: {
        text: 'Read Stories',
        link: '#news',
        color: 'bg-teal-500 hover:bg-blue-800',
      },
    },
  ];

  return (
    <section id="home" className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative w-full h-full" // quan trọng để chứa overlay và content
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(/images/banner${index + 1}.jpg)`,
                zIndex: 0,
              }}
            />
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 space-y-4 max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl">{slide.heading}</h3>
              <h1 className="text-4xl md:text-5xl font-bold">{slide.title}</h1>
              <a
                href={slide.button.link}
                className={`inline-block px-6 py-3 mt-4 rounded transition ${slide.button.color}`}
              >
                {slide.button.text}
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Home;
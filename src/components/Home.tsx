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
      description: 'Improve your health with our expert team.', // đoạn giới thiệu 10-15 chữ
      buttons: [
        {
          text: 'Meet Our Doctors',
          link: '#team',
          color: 'bg-sky-700 hover:bg-white hover:text-sky-600',
        },
        {
          text: 'Find a Consultant',
          link: '#consultant',
          color: 'bg-sky-700 hover:bg-white hover:text-sky-600',
        },
      ],
    },
    {
      heading: 'Aenean luctus lobortis tellus',
      title: 'New Lifestyle',
      description: 'Discover new ways to live healthier and happier.',
      buttons: [
        {
          text: 'Meet Our Doctors',
          link: '#team',
          color: 'bg-sky-700 hover:bg-white hover:text-sky-600',
        },
        {
          text: 'Find a Consultant',
          link: '#consultant',
          color: 'bg-sky-700 hover:bg-white hover:text-sky-600',
        },
      ],
    },
    {
      heading: 'Pellentesque nec libero nisi',
      title: 'Your Health Benefits',
      description: 'Learn how to maximize your wellness and benefits.',
      buttons: [
        {
          text: 'Meet Our Doctors',
          link: '#team',
          color: 'bg-sky-700 hover:bg-white hover:text-sky-600',
        },
        {
          text: 'Find a Consultant',
          link: '#consultant',
          color: 'bg-sky-700 hover:bg-white hover:text-sky-600',
        },
      ],
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
            className="relative w-full h-full"
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
              <p className="text-md md:text-lg max-w-md mx-auto">{slide.description}</p> {/* Đoạn giới thiệu */}
              <div className="flex gap-4 mt-4">
                {slide.buttons.map((button, btnIndex) => (
                  <a
                    key={btnIndex}
                    href={button.link}
                    className={`inline-block px-6 py-3 rounded transition ${button.color}`}
                  >
                    {button.text}
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

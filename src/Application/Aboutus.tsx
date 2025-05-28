import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PiPulseThin } from "react-icons/pi";
import { Autoplay, Navigation as SwiperNavigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  {
    text: "Amazing service and care. The staff is very professional and attentive.",
    name: "Sarah Johnson",
    title: "Patient",
    avatar: "/images/aboutusava.png"
  },
  {
    text: "Outstanding medical facility with state-of-the-art equipment.",
    name: "Michael Brown",
    title: "Patient",
    avatar: "/images/aboutusava2.png"
  },
  {
    text: "The doctors here are highly skilled and compassionate.",
    name: "Emily Davis",
    title: "Patient",
    avatar: "/images/aboutusava3.png"
  }
];

const slides = [
  {
    image: "/images/aboutus1.png",
    title: "Top-notch Services",
  },
  {
    image: "/images/aboutus2.png",
    title: "Better Communication",
  },
  {
    image: "/images/aboutus1.png",
    title: "Patient Happiness",
  },
  {
    image: "/images/aboutus2.png",
    title: "Modern Facilities",
  },
  {
    image: "/images/aboutus1.png",
    title: "Expert Team",
  },
];

const slideDescription =
  "Demergo victus aveho. Amor caries comptus ulterius considero. Abbas trucido aegrotatio patria coniungo colo.";

const Aboutus: React.FC = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () =>
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="font-inter text-gray-800">
      {/* Hero */}
      <section
        className="py-12 text-center bg-cover bg-center h-[350px] relative flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/images/blog1.jpg')" }}
      >
        <h2 className="text-5xl text-white font-bold">About Us</h2>
        <p className="text-sm mt-2 text-white">
          Home <span className="text-[#55AEFF]">/ About Us</span>
        </p>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto mt-20 px-4">
        <div className="text-left mb-12">
          <div className="flex items-center gap-2 mb-2">
            <PiPulseThin className="w-5 h-5 text-[#1977CC] stroke-2" />
            <span className="text-[#1977CC] font-medium uppercase text-sm tracking-widest">
              MEDOVA VALUES
            </span>
          </div>
          <h2 className="text-[40px] text-[#1C2359] leading-tight">
            <strong>Our Core</strong> Values
          </h2>
        </div>

        <Swiper
          modules={[SwiperNavigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          allowTouchMove={false}
          className="w-full"
        >
          {slides.map(({ image, title }, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <img src={image} alt={title} className="w-full h-[200px] object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1C2359] mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">{slideDescription}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Testimonials */}
      <section
        className="py-20 mt-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/aboutus4.png')" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-2">
              <PiPulseThin className="w-5 h-5 text-[#1977CC] stroke-2" />
              <span className="text-[#1977CC] font-medium uppercase text-sm tracking-widest">
                TESTIMONIALS
              </span>
            </div>
            <h2 className="text-[40px] text-[#1C2359] mt-2">
              What Our Patients<br />
              <strong>Think About Us</strong>
            </h2>
          </div>


          <div className="relative max-w-3xl mx-auto bg-white rounded-2xl p-12 shadow-lg">
            <img src="/images/aboutusvector.png" alt="Quote" className="w-12 h-12 mb-6" />
            <p className="font-bold text-lg text-[#1C2359] mb-8">{currentTestimonial.text}</p>

            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-3">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-[#1C2359]">{currentTestimonial.name}</h4>
                  <p className="text-sm text-[#1977CC]">{currentTestimonial.title}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={prevTestimonial} className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100">
                  <FaChevronLeft className="text-[#1977CC]" />
                </button>
                <button onClick={nextTestimonial} className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100">
                  <FaChevronRight className="text-[#1977CC]" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-16 mt-16">
            {testimonials.map(({ avatar, name }, i) => (
              <div
                key={i}
                className={`w-12 h-12 rounded-full border-2 ${i === testimonialIndex ? "border-[#1977CC]" : "border-gray-300"
                  } overflow-hidden`}
              >
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;

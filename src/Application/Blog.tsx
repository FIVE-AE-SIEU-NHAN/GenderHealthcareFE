import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blog: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/images/slide1.jpg",
      text: "Chăm sóc sức khỏe toàn diện"
    },
    {
      image: "/images/slide2.jpg",
      text: "Đội ngũ bác sĩ chuyên nghiệp"
    },
    {
      image: "/images/slide3.jpg",
      text: "Dịch vụ y tế chất lượng cao"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="font-inter text-gray-800">

      <section className="py-12 text-center bg-cover bg-center h-[350px] relative flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/blog1.jpg')",
          position: 'relative'
        }}>
        <h2 className="text-5xl text-white font-bold">Our Blogs</h2>
        <p className="text-sm mt-2">
          <span className="text-white">Home</span>
          <span style={{ color: '#55AEFF' }}> / Blog List</span>
        </p>
      </section>

      <section className="max-w-7xl mx-auto mt-10 px-4">
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
          <img
            src={slides[currentSlide].image}
            alt="slide"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <p className="text-2xl text-center max-w-2xl text-white">
              {slides[currentSlide].text}
            </p>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/10 text-white p-4 hover:bg-black/30 transition-all"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/10 text-white p-4 hover:bg-black/30 transition-all"
          >
            ❯
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/50'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div className="font-inter border p-6 rounded shadow">
          <img
            src={`/images/bs4.jpg`}
            alt=""
            className="rounded mb-4 w-full object-cover"
          />
          <p className="text-xs text-gray-500">📅 20/05/2025</p>
          <h3 className="font-semibold text-2xl mt-2">Đội ngũ bác sĩ tốt nhất của Vin Mec</h3>
          <p className="text-sm text-gray-600 mt-2">Vừa qua tập đoàn Vin Group vừa công bố đội ngũ,
            nghiên cứu sinh thuộc hàng top của Việt Nam. Trong nhóm này bao gồm 15 Giáo Sư, 20 Tiến Sĩ,
            30 Bác Sĩ Chuyên Khoa và 50 Bác Sĩ Đa Khoa. Họ sẽ là đội ngũ trực tại Vin Mec trên toàn quốc...</p>
          <div className="flex items-center gap-2 mt-2">
            <img
              src={`/images/bs4.jpg`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="text-xs text-gray-500 mt-2">Tác giả: NhatNHM</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border p-3 rounded shadow">
              <img
                src={`/images/mau${i}.jpg`}
                alt={`Bài viết ${i}`}
                className="rounded mb-2 w-full object-cover"
              />
              <p className="text-xs text-gray-500">📅 20/05/2025</p>

              <Link to={`/blog/${i}`}>
                <h4 className="font-semibold text-md mt-1 text-blue-600 hover:underline">
                  Chàng khờ {i}
                </h4>
              </Link>

              <p className="text-sm text-gray-600 mt-1">Chàng khờ tại FPTU</p>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={`/images/bs4.jpg`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-xs text-gray-500 mt-1">Tác giả: KietTT</p>
              </div>
            </div>
          ))}
        </div>


        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border p-3 rounded shadow">
              <img
                src={`/images/bacsi${i}.jpg`}
                alt={`Bài viết ${i}`}
                className="rounded mb-2 w-full object-cover"
              />
              <p className="text-xs text-gray-500">📅 20/05/2025</p>
              <h4 className="font-semibold text-md mt-1">Chàng khờ {i}</h4>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={`/images/bs4.jpg`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-xs text-gray-500 mt-1">Tác giả: Carmen</p>
              </div>
            </div>
          ))}
        </div>


        <div className="border p-6 rounded shadow">
          <h4 className="font-bold text-xl mb-4">📈 TRENDING</h4>
          <ul className="space-y-0 h-[500px] overflow-y-auto">
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">🌟 Bài viết nổi bật nhất tháng này</p>
              <p className="text-xs text-gray-500 mt-1">Jane Cooper</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">📌 10 mẹo chăm sóc sức khỏe hiệu quả</p>
              <p className="text-xs text-gray-500 mt-1">Wade Warren</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">💡 Cách nhận biết dấu hiệu sớm của bệnh</p>
              <p className="text-xs text-gray-500 mt-1">Esther Howard</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">🔍 Tại sao nên kiểm tra sức khỏe định kỳ?</p>
              <p className="text-xs text-gray-500 mt-1">Cameron Williamson</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">✨ Lời khuyên từ chuyên gia</p>
              <p className="text-xs text-gray-500 mt-1">Jenny Wilson</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">🌟 Bài viết nổi bật nhất tháng này</p>
              <p className="text-xs text-gray-500 mt-1">Jane Cooper</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">📌 10 mẹo chăm sóc sức khỏe hiệu quả</p>
              <p className="text-xs text-gray-500 mt-1">Wade Warren</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">💡 Cách nhận biết dấu hiệu sớm của bệnh</p>
              <p className="text-xs text-gray-500 mt-1">Esther Howard</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">🔍 Tại sao nên kiểm tra sức khỏe định kỳ?</p>
              <p className="text-xs text-gray-500 mt-1">Cameron Williamson</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">✨ Lời khuyên từ chuyên gia</p>
              <p className="text-xs text-gray-500 mt-1">Jenny Wilson</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">🌟 Bài viết nổi bật nhất tháng này</p>
              <p className="text-xs text-gray-500 mt-1">Jane Cooper</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">📌 10 mẹo chăm sóc sức khỏe hiệu quả</p>
              <p className="text-xs text-gray-500 mt-1">Wade Warren</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">💡 Cách nhận biết dấu hiệu sớm của bệnh</p>
              <p className="text-xs text-gray-500 mt-1">Esther Howard</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">🔍 Tại sao nên kiểm tra sức khỏe định kỳ?</p>
              <p className="text-xs text-gray-500 mt-1">Cameron Williamson</p>
            </li>
            <li className="group cursor-pointer border-b border-gray-200 py-4">
              <p className="font-bold text-gray-800 hover:text-blue-600 text-base">✨ Lời khuyên từ chuyên gia</p>
              <p className="text-xs text-gray-500 mt-1">Jenny Wilson</p>
            </li>
          </ul>
        </div>
      </section>

      <div className="flex justify-center mt-12 mb-8 space-x-2">
        <button className="px-3 py-1 border rounded">1</button>
        <button className="px-3 py-1 border rounded bg-blue-500 text-white">2</button>
        <button className="px-3 py-1 border rounded">3</button>
      </div>
    </div>
  );
};

export default Blog;

import React from 'react';

const About: React.FC = () => {
  const doctorImage = "/images/bacsi1.jpg";

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Nội dung bên trái */}
        <div className="space-y-6 order-2 md:order-1">
          <h2 className="text-3xl font-bold text-teal-600 flex items-center gap-2">
            Welcome to Your <i className="fa fa-h-square"></i>ealth Center
          </h2>
          <p className="text-gray-700">
            Aenean luctus lobortis tellus, vel ornare enim molestie condimentum. Curabitur lacinia nisi vitae velit volutpat venenatis.
          </p>
          <p className="text-gray-700">
            Sed a dignissim lacus. Quisque fermentum est non orci commodo, a luctus urna mattis. Ut placerat, diam a tempus vehicula.
          </p>
          <div className="flex justify-end">
  <div className="flex items-center space-x-4">
    <img 
      src={doctorImage} 
      alt="Dr. Neil Jackson" 
      className="w-12 h-12 rounded-full object-cover"
    />
    <div>
      <h3 className="font-semibold">Dr. Nhân Kiệt</h3>
      <p className="text-sm text-gray-600">General Principal</p>
    </div>
  </div>
</div>
        </div>

        {/* Ảnh chân dung lớn bên phải */}
        <div className="order-1 md:order-2 flex justify-center">
          <img
            src={doctorImage}
            alt="Dr. Neil Jackson"
            className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default About;

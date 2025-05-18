import React, { useState } from 'react';

const teamMembers = [
  {
    name: 'Nhân Kiệt',
    position: 'General Principal',
    phone: '010-020-0120',
    email: 'general@company.com',
    image: '/images/bacsi1.jpg',
    socials: ['linkedin-square'],
  },
  {
    name: 'Đức Phương',
    position: 'Pregnancy',
    phone: '010-070-0170',
    email: 'pregnancy@company.com',
    image: '/images/bacsi1.jpg',
    socials: ['facebook-square', 'flickr'],
  },
  {
    name: 'Nhân Kiệt',
    position: 'Cardiology',
    phone: '010-040-0140',
    email: 'cardio@company.com',
    image: '/images/bacsi1.jpg',
    socials: ['twitter'],
  },
  {
    name: 'Bác sĩ A',
    position: 'Neurology',
    phone: '010-111-1111',
    email: 'neuro@company.com',
    image: '/images/bacsi1.jpg',
    socials: ['twitter'],
  },
  {
    name: 'Bác sĩ B',
    position: 'Dermatology',
    phone: '010-222-2222',
    email: 'derma@company.com',
    image: '/images/bacsi1.jpg',
    socials: ['facebook-square'],
  },
  {
    name: 'Bác sĩ C',
    position: 'Pediatrics',
    phone: '010-333-3333',
    email: 'pediatrics@company.com',
    image: '/images/bacsi1.jpg',
    socials: ['linkedin-square'],
  },
];

const ITEMS_PER_PAGE = 3;

const Team: React.FC = () => {
  const [page, setPage] = useState(0);

  const maxPage = Math.ceil(teamMembers.length / ITEMS_PER_PAGE) - 1;

  const handlePrev = () => setPage((p) => (p === 0 ? maxPage : p - 1));
  const handleNext = () => setPage((p) => (p === maxPage ? 0 : p + 1));

  const currentMembers = teamMembers.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <section id="team" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-teal-600 mb-8 text-center">Our Doctors</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm group transition-all duration-300 min-h-[550px]"
            >
              {/* Hình ảnh và nút hover */}
              <div className="relative h-[380px]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />

                <div
                  className="absolute inset-x-0 bottom-0 flex justify-center space-x-4 pb-4
                    transform translate-y-full opacity-0 pointer-events-none
                    group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto
                    transition-all duration-500"
                >
                  <a
                    href={`mailto:${member.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-teal-600 hover:bg-transparent border border-white transition"
                  >
                    <i className="fa fa-envelope"></i>
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-teal-600 hover:bg-transparent border border-white transition"
                  >
                    <i className="fa fa-phone"></i>
                  </a>
                </div>
              </div>

              {/* Thông tin */}
              <div className="p-5 flex flex-col h-full">
                <h3 className="text-xl font-bold text-teal-600">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>

                <div className="border-b border-gray-300 my-4"></div>

                <div className="text-sm text-gray-700">
                  <p className="mb-1">
                    <i className="fa fa-phone mr-2"></i>
                    {member.phone}
                  </p>
                  <p>
                    <i className="fa fa-envelope-o mr-2"></i>
                    <a href={`mailto:${member.email}`} className="hover:underline">
                      {member.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút phân trang */}
        <div className="flex justify-center mt-10 space-x-6">
          <button
            onClick={handlePrev}
            className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
          >
            &larr; Prev
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;

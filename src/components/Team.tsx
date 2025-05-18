import React, { useState } from 'react';

const teamMembers = [
  {
    name: 'Dr. Julia Jany',
    position: 'Gynecology Specialist',
    phone: '010-020-0120',
    email: 'general@company.com',
    image: '/images/bacsi1.jpg',
  },
  {
    name: 'Dr. Michel Liu',
    position: 'Heart Specialist',
    phone: '010-070-0170',
    email: 'pregnancy@company.com',
    image: '/images/bacsi1.jpg',
  },
  {
    name: 'Dr. Jesmine Ruby',
    position: 'Neurology Specialist',
    phone: '010-040-0140',
    email: 'cardio@company.com',
    image: '/images/bacsi1.jpg',
  },
  {
    name: 'Dr. Alex Smith',
    position: 'Cardiology Specialist',
    phone: '010-111-1111',
    email: 'neuro@company.com',
    image: '/images/bacsi1.jpg',
  },
  {
    name: 'Dr. Emily Tran',
    position: 'Dermatology Specialist',
    phone: '010-222-2222',
    email: 'derma@company.com',
    image: '/images/bacsi1.jpg',
  },
  {
    name: 'Dr. Kevin Dao',
    position: 'Pediatrics Specialist',
    phone: '010-333-3333',
    email: 'pediatrics@company.com',
    image: '/images/bacsi1.jpg',
  },
];

const ITEMS_PER_PAGE = 4;

const Team: React.FC = () => {
  const [page, setPage] = useState(0);

  const maxPage = Math.ceil(teamMembers.length / ITEMS_PER_PAGE) - 1;
  const handlePrev = () => setPage((p) => (p === 0 ? maxPage : p - 1));
  const handleNext = () => setPage((p) => (p === maxPage ? 0 : p + 1));

  const currentMembers = teamMembers.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="relative py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sky-700 uppercase text-sm tracking-widest font-semibold">
            Medical Experts
          </p>
          <h2 className="text-4xl font-bold text-gray-800">
            Skilled Professionals at <span className="text-blue-700">Care4Gender</span>
          </h2>
        </div>

        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-sky-700 text-white p-3 rounded-full hover:bg-white hover:text-black transition"
        >
          &#8592;
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {currentMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-[280px] object-cover"
              />
              <div className="mt-3 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.position}</p>
                <div className="flex justify-center space-x-3 mt-2 text-gray-600">
                  <a href={`mailto:${member.email}`} className="hover:text-teal-600">
                    <i className="fa fa-envelope"></i>
                  </a>
                  <a href={`tel:${member.phone}`} className="hover:text-teal-600">
                    <i className="fa fa-phone"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-sky-700 text-white p-3 rounded-full hover:bg-white hover:text-black transition" >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default Team;

import React, { useState } from 'react';

const newsPosts = [
  {
    date: 'May 16, 2025',
    title: 'About Amazing Technology',
    excerpt: 'Maecenas risus neque, placerat volutpat tempor ut, vehicula et felis.',
    author: 'Jeremie Carlson',
    position: 'CEO / Founder',
    image: '/images/new1.jpg',
    authorImg: '/images/bacsi1.jpg',
  },
  {
    date: 'May 16, 2025',
    title: 'Introducing a new healing process',
    excerpt: 'Fusce vel sem finibus, rhoncus massa non, aliquam velit. Nam et est ligula.',
    author: 'Jason Stewart',
    position: 'General Director',
    image: '/images/new1.jpg',
    authorImg: '/images/bacsi1.jpg',
  },
  {
    date: 'May 16, 2025',
    title: 'Review Annual Medical Research',
    excerpt: 'Vivamus non nulla semper diam cursus maximus. Pellentesque dignissim.',
    author: 'Andrio Abero',
    position: 'Online Advertising',
    image: '/images/new1.jpg',
    authorImg: '/images/bacsi1.jpg',
  },
  {
    date: 'May 16, 2025',
    title: 'New Advances in Medicine',
    excerpt: 'Curabitur in metus ut sapien varius dapibus.',
    author: 'Lara Croft',
    position: 'Medical Researcher',
    image: '/images/new1.jpg',
    authorImg: '/images/bacsi1.jpg',
  },
  {
    date: 'May 16, 2025',
    title: 'Health Tech Innovations',
    excerpt: 'Phasellus luctus velit in neque tincidunt maximus.',
    author: 'John Doe',
    position: 'Tech Specialist',
    image: '/images/new1.jpg',
    authorImg: '/images/bacsi1.jpg',
  },
  {
    date: 'May 16, 2025',
    title: 'Health Tech Innovations',
    excerpt: 'Phasellus luctus velit in neque tincidunt maximus.',
    author: 'John Doe',
    position: 'Tech Specialist',
    image: '/images/new1.jpg',
    authorImg: '/images/bacsi1.jpg',
  },

];

const ITEMS_PER_PAGE = 3;

const News: React.FC = () => {
  const [page, setPage] = useState(0);

  const maxPage = Math.ceil(newsPosts.length / ITEMS_PER_PAGE) - 1;

  const handlePrev = () => {
    setPage((p) => (p === 0 ? maxPage : p - 1));
  };

  const handleNext = () => {
    setPage((p) => (p === maxPage ? 0 : p + 1));
  };

  const currentPosts = newsPosts.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <section id="news" className="py-20 bg-white relative">
      <div className="container mx-auto px-4 max-w-7xl relative">
        <h2 className="text-4xl font-bold text-teal-600 mb-10 text-center">Latest News</h2>

        {/* Nút Prev */}
        <button
          onClick={handlePrev}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 bg-teal-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-teal-700 transition"
          aria-label="Previous"
        >
          <i className="fa fa-chevron-left"></i>
        </button>

        {/* Nút Next */}
        <button
          onClick={handleNext}
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 bg-teal-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-teal-700 transition"
          aria-label="Next"
        >
          <i className="fa fa-chevron-right"></i>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {currentPosts.map((post, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md flex flex-col">
              <img src={post.image} alt={post.title} className="w-full h-56 md:h-64 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-sm text-gray-500">{post.date}</span>
                <h3 className="text-2xl font-semibold text-teal-700 mt-3 mb-4 leading-snug">{post.title}</h3>
                <p className="text-gray-700 mb-6 flex-grow">{post.excerpt}</p>
                <div className="flex items-center space-x-4 mt-auto">
                  <img src={post.authorImg} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h5 className="font-semibold text-base">{post.author}</h5>
                    <p className="text-sm text-gray-500">{post.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;

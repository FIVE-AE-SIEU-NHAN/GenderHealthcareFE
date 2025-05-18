import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const newsPosts = [
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: '/images/new1.jpg',
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: '/images/new1.jpg',
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: '/images/new1.jpg',
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: '/images/new1.jpg',
  },
  {
    date: 'Mar 20, 2021',
    title: 'Get the Home care and nursing service',
    excerpt: 'Debitis aut rerum nec sitatoe bus saereve eveniet...',
    image: '/images/new1.jpg',
  },
];

const ITEMS_PER_PAGE = 3;

const News: React.FC = () => {
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(newsPosts.length / ITEMS_PER_PAGE) - 1;

  const handlePrev = () => setPage((p) => (p === 0 ? maxPage : p - 1));
  const handleNext = () => setPage((p) => (p === maxPage ? 0 : p + 1));

  const currentPosts = newsPosts.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <section id="news" className="py-20 bg-white text-center">
      <div className="container mx-auto px-4 max-w-7xl">
        <p className="text-blue-500 uppercase tracking-wider mb-2 text-sm">News & Blog</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-10">Latest News & Blogs</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {currentPosts.map((post, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-md">
              <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              <div className="bg-white text-left p-5">
                <div className="text-blue-600 text-sm flex items-center mb-2">
                  <FaCalendarAlt className="mr-2" />
                  {post.date}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                <a href="#" className="text-blue-600 text-sm font-medium hover:underline">
                  Read More &rsaquo;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: Math.ceil(newsPosts.length / ITEMS_PER_PAGE) }).map((_, i) => (
            <span
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === page ? 'bg-blue-700' : 'bg-gray-300'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;

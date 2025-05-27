import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  author: string;
  image: string;
  created_at: string;
}

const BlogCard: React.FC<Blog & { className?: string; style?: React.CSSProperties }> = ({
  id,
  title,
  author,
  image,
  created_at,
  className,
  style,
}) => {
  return (
    <Link
      to={`/blog/${id}`}
      className={`rounded-lg border border-gray-300 p-4 hover:shadow-lg transition-shadow flex flex-col ${className}`}
      style={style}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <div className="text-sm text-gray-500">
        <span>{author}</span> |{" "}
        <time dateTime={created_at}>
          {new Date(created_at).toLocaleDateString()}
        </time>
      </div>
    </Link>
  );
};

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/slide1.jpg",
      text: "Chăm sóc sức khỏe toàn diện",
    },
    {
      image: "/images/slide2.jpg",
      text: "Đội ngũ bác sĩ chuyên nghiệp",
    },
    {
      image: "/images/slide3.jpg",
      text: "Dịch vụ y tế chất lượng cao",
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Lấy top 5 blog để trending
  const trendingBlogs = blogs.slice(0, 5);

  return (
    <div className="font-inter text-gray-800">
      {/* Banner & breadcrumb */}
      <section
        className="py-12 text-center bg-cover bg-center h-[350px] relative flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/images/blog1.jpg')" }}
      >
        <h2 className="text-5xl text-white font-bold">Our Blogs</h2>
        <p className="text-sm mt-2">
          <span className="text-white">Home</span>
          <span style={{ color: "#55AEFF" }}> / Blog List</span>
        </p>
      </section>

      {/* Slider */}
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
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main content: blog list + sidebar */}
      <section className="max-w-7xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Blog list grid */}
        <div className="md:col-span-3">
          <section className="grid grid-cols-3 gap-6" style={{ height: 600 }}>
            {/* Cột 1: bài lớn chiếm 2 hàng (height 100%) */}
            {blogs[0] && (
              <BlogCard
                {...blogs[0]}
                className="row-span-2"
                style={{ height: "100%" }}
              />
            )}

            {/* Cột 2: 2 bài nhỏ chia đều chiều cao, container flex-col full height */}
            <div className="flex flex-col gap-6" style={{ height: "100%" }}>
              {blogs[1] && (
                <BlogCard {...blogs[1]} style={{ flex: 1, minHeight: 0 }} />
              )}
              {blogs[2] && (
                <BlogCard {...blogs[2]} style={{ flex: 1, minHeight: 0 }} />
              )}
            </div>

            {/* Cột 3: 2 bài nhỏ chia đều chiều cao, container flex-col full height */}
            <div className="flex flex-col gap-6" style={{ height: "100%" }}>
              {blogs[3] && (
                <BlogCard {...blogs[3]} style={{ flex: 1, minHeight: 0 }} />
              )}
              {blogs[4] && (
                <BlogCard {...blogs[4]} style={{ flex: 1, minHeight: 0 }} />
              )}
            </div>
          </section>
        </div>

        {/* Sidebar trending */}
        <div className="border p-6 rounded shadow">
          <h4 className="font-bold text-xl mb-4">📈 TRENDING</h4>
          <ul className="space-y-4 max-h-[500px] overflow-y-auto">
            {trendingBlogs.length > 0 ? (
              trendingBlogs.map((blog) => (
                <li
                  key={blog.id}
                  className="group cursor-pointer border-b border-gray-200 py-3"
                >
                  <Link to={`/blog/${blog.id}`}>
                    <p className="font-bold text-gray-800 hover:text-blue-600 text-base">
                      {blog.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{blog.author}</p>
                  </Link>
                </li>
              ))
            ) : (
              <p>Loading trending blogs...</p>
            )}
          </ul>
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-12 mb-8 space-x-2">
        <button className="px-3 py-1 border rounded">1</button>
        <button className="px-3 py-1 border rounded bg-blue-500 text-white">
          2
        </button>
        <button className="px-3 py-1 border rounded">3</button>
      </div>
    </div>
  );
};

export default BlogPage;

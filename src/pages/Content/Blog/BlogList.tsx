import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  userId: string;
  image: string;
  createdAt: string;
  content: string;
  authorName?: string;
}

const BlogCard: React.FC<
  Blog & { className?: string; style?: React.CSSProperties }
> = ({ id, title, authorName, image, createdAt, className = "", content, style }) => {
  return (
    <Link
      to={`/blog/${id}`}
      onClick={() => {
        const blogData = { id, title, authorName, image, createdAt, content };
        sessionStorage.setItem(`blog_${id}`, JSON.stringify(blogData));
      }}
      className={`rounded-lg border border-gray-300 p-4 hover:shadow-lg transition-shadow flex flex-col ${className}`}
      style={style}
    >
      <img src={image} alt={title} className="w-full h-40 object-cover rounded mb-3" />
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <div className="text-sm text-gray-500 mb-2">
        <span>{authorName || "Đang tải người dùng..."}</span> |{" "}
        <time dateTime={createdAt}>{new Date(createdAt).toLocaleString()}</time>
      </div>
      <div
        className="text-sm text-gray-700 overflow-hidden line-clamp-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Link>
  );
};

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get<Blog[]>("http://localhost:3000/api/blogs")
      .then(res => {
        setBlogs(res.data);
      })
      .catch(err => console.error("Lỗi khi lấy blogs:", err));
  }, []);

  const trendingBlogs = blogs.slice(0, 5);

  return (
    <div className="font-inter text-gray-800">
      <section
        className="py-12 text-center bg-cover bg-center h-[350px] relative flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/images/Banner.png')" }}
      >
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: "#1A2159", opacity: 0.7 }}
        ></div>
        
        <h2 className="text-5xl text-white font-bold relative z-10">Our Blogs</h2>
        <p className="text-sm mt-2 relative z-10">
          <span className="text-white">Home</span>
          <span style={{ color: "#55AEFF" }}> / Blog List</span>
        </p>
      </section>

      <section className="max-w-7xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <section className="grid grid-cols-3 gap-6" style={{ height: 600 }}>
            {blogs[0] && (
              <BlogCard
                {...blogs[0]}
                className="row-span-2"
                style={{ height: "100%" }}
              />
            )}

            <div className="flex flex-col gap-6" style={{ height: "100%" }}>
              {blogs[1] && (
                <BlogCard
                  {...blogs[1]}
                  style={{ flex: 1, minHeight: 0 }}
                />
              )}
              {blogs[2] && (
                <BlogCard
                  {...blogs[2]}
                  style={{ flex: 1, minHeight: 0 }}
                />
              )}
            </div>

            <div className="flex flex-col gap-6" style={{ height: "100%" }}>
              {blogs[3] && (
                <BlogCard
                  {...blogs[3]}
                  style={{ flex: 1, minHeight: 0 }}
                />
              )}
              {blogs[4] && (
                <BlogCard
                  {...blogs[4]}
                  style={{ flex: 1, minHeight: 0 }}
                />
              )}
            </div>
          </section>
        </div>

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
                    <p className="text-xs text-gray-500 mt-1">
                      {blog.authorName || "Đang tải người dùng..."}
                    </p>
                  </Link>
                </li>
              ))
            ) : (
              <p>Loading trending blogs...</p>
            )}
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

export default BlogPage;

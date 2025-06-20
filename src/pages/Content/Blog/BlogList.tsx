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
> = ({
  id,
  title,
  authorName,
  image,
  createdAt,
  className = "",
  content,
  style,
}) => {
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
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <div className="text-sm text-gray-500 mb-2">
        <span>{authorName || "Đang tải người dùng..."}</span> |{" "}
        <time dateTime={createdAt}>
          {new Date(createdAt).toLocaleString("vi-VN")}
        </time>
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
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const [totalBlogs, setTotalBlogs] = useState(0);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get<Blog[]>(
        `http://localhost:3000/api/blogs?page=${currentPage}&limit=${blogsPerPage}`
      );
      const totalCount = parseInt(res.headers["x-total-count"] || "0", 10);
      setBlogs(res.data);
      setTotalBlogs(totalCount);
    } catch (err) {
      console.error("Lỗi khi lấy blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="font-inter text-gray-800 min-h-screen pb-20">
      {/* Banner */}
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

      {/* Blog + Sidebar */}
      <section className="max-w-7xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <section className="grid grid-cols-3 gap-6 min-h-[600px]">
            {blogs[0] && (
              <BlogCard {...blogs[0]} className="row-span-2" style={{ height: "100%" }} />
            )}
            <div className="flex flex-col gap-6">
              {blogs[1] && <BlogCard {...blogs[1]} style={{ flex: 1 }} />}
              {blogs[2] && <BlogCard {...blogs[2]} style={{ flex: 1 }} />}
            </div>
            <div className="flex flex-col gap-6">
              {blogs[3] && <BlogCard {...blogs[3]} style={{ flex: 1 }} />}
              {blogs[4] && <BlogCard {...blogs[4]} style={{ flex: 1 }} />}
            </div>
          </section>
        </div>

        {/* Trending */}
        <div className="border p-6 rounded shadow h-fit">
          <h4 className="font-bold text-xl mb-4">📈 TRENDING</h4>
          <ul className="space-y-4 max-h-[500px] overflow-y-auto">
            {blogs.length > 0 ? (
              blogs.slice(0, 5).map((blog) => (
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
              <p>Đang tải blog trending...</p>
            )}
          </ul>
        </div>
      </section>

      {/* Pagination */}
      {totalPages >= 1 && (
        <div className="flex justify-center mt-12 space-x-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-blue-500 text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;

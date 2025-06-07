import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";

interface Blog {
  id: number;
  title: string;
  userId: string;
  authorName: string;
  createdAt: string;
  mainImage: string;
  summary: string;
  content?: string;
  subImage?: string;
  section1?: string;
  section2?: string;
}

const getImageUrl = (url?: string) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `http://localhost:3000/uploads/${url}`;
};

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    sessionStorage.removeItem(`blog_${id}`); // Clear cache mỗi lần thử

    const cached = sessionStorage.getItem(`blog_${id}`);
    if (cached) {
      try {
        const parsed: Blog = JSON.parse(cached);
        setBlog(parsed);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi parse cached blog:", err);
        fetchBlog(id);
      }
    } else {
      fetchBlog(id);
    }

    function fetchBlog(blogId: string) {
      setLoading(true);
      fetch(`http://localhost:3000/api/blogs/${blogId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Lỗi khi fetch blog");
          return res.json();
        })
        .then((data) => {
          console.log("Fetched blog data:", data);
          setBlog(data);
          sessionStorage.setItem(`blog_${blogId}`, JSON.stringify(data));
        })
        .catch((err) => {
          console.error("Fetch blog error:", err);
          setBlog(null);
        })
        .finally(() => setLoading(false));
    }

    // Load recent blogs
    fetch("http://localhost:3000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        const recent = data.slice(0, 5);
        setRecentBlogs(recent);
      })
      .catch((err) => console.error("Fetch recent blogs error:", err));
  }, [id]);

  if (loading) return <div className="p-8">Đang tải bài viết...</div>;
  if (!blog) return <div className="p-8 text-red-500">Không tìm thấy bài viết.</div>;

  console.log("Rendering blog:", blog);

  return (
    <div className="font-inter text-gray-800 max-w-7xl mx-auto px-4 py-8">
      {/* Ảnh banner lớn */}
      <div className="w-full h-[400px] mb-12">
        <img
          src={getImageUrl(blog.mainImage)}
          alt={blog.title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Cột trái: Recent blogs */}
        <aside className="md:col-span-1 border p-6 rounded shadow h-fit">
          <h4 className="font-bold text-xl mb-4">Recent Blogs</h4>
          <ul className="space-y-4">
            {recentBlogs.map((b) => (
              <li key={b.id}>
                <Link
                  to={`/blog/${b.id}`}
                  className="block text-blue-600 hover:underline"
                >
                  <p className="font-medium">{b.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {b.authorName || "Unknown"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Cột phải: Nội dung chi tiết blog */}
        <article className="md:col-span-3">
          <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
          <p className="text-sm text- mb-6">
            {blog.authorName} |{" "}
            <time dateTime={blog.createdAt}>
              {new Date(blog.createdAt).toLocaleString("vi-VN")}
            </time>
          </p>

          {/* Summary */}
          <div className="text-lg mb-6 whitespace-pre-line">{blog.summary}</div>

          {/* Content */}
          {blog.content && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2"> Nội dung bài viết</h2>
              <p className="text-base leading-7 whitespace-pre-line">{blog.content}</p>
            </section>
          )}

          {/* Section 1 */}
          {blog.section1 && blog.section1.trim() !== "" && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2"> Nội dung chính</h2>
              <p className="text-base leading-7 whitespace-pre-line">{blog.section1}</p>
            </section>
          )}

          {/* Ảnh phụ nếu có */}
          {blog.subImage && (
            <div className="my-6">
              <img
                src={getImageUrl(blog.subImage)}
                alt="Ảnh phụ"
                className="w-full rounded shadow"
              />
            </div>
          )}

          {/* Section 2 */}
          {blog.section2 && blog.section2.trim() !== "" && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2"> Thông tin bổ sung</h2>
              <p className="text-base leading-7 whitespace-pre-line">{blog.section2}</p>
            </section>
          )}

          <hr className="my-8 border-t border-gray-200" />
          <div className="flex items-center gap-3 justify-start mb-6">
            <span className="text-gray-600 font-medium mr-2">Share:</span>
            <Link to={""} className="text-blue-600 hover:text-blue-800">
              <FaFacebookF className="text-2xl" />
            </Link>
            <Link to={""} className="text-gray-800 hover:text-gray-600">
              <FaXTwitter className="text-2xl" />
            </Link>
            <Link to={""} className="text-blue-500 hover:text-blue-700">
              <FaLink className="text-2xl" />
            </Link>
          </div>
          <hr className="my-8 border-t border-gray-200" />
          
          {/* Like Button */}
          <div className="flex items-center gap-2 mb-8">
            <button 
              className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-full transition-colors"
              onClick={() => {
                // Handle like functionality here
                const likeCount = document.getElementById('likeCount');
                if (likeCount) {
                  const currentLikes = parseInt(likeCount.innerText) || 0;
                  likeCount.innerText = (currentLikes + 1).toString();
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-medium">Like</span>
              <span id="likeCount" className="bg-gray-100 px-2 py-1 rounded-full text-sm">0</span>
            </button>
          </div>
          
          
          {/* Comment Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold mb-6">Comments</h3>

            <form className="mb-8">
              <div className="mb-4">
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your comment here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-[#1A3973] hover:bg-[#2A59A3] text-white font-medium py-2 px-6 rounded-md">
                Post Comment
              </button>
            </form>
            
            <div className="text-center py-8 text-gray-500">
              Be the first to comment on this article.
            </div>
            
      
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;

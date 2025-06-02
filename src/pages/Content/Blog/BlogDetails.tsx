import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
          <h4 className="font-bold text-xl mb-4">🕘 Recent Blogs</h4>
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
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;

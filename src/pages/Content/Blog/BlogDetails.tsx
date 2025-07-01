import React from "react";
import { Link } from "react-router-dom";

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
  return url.startsWith("http") ? url : `/uploads/${url}`;
};

const BlogDetails: React.FC = () => {
  const blog: Blog = {
    id: 1,
    title: "Giới thiệu về trí tuệ nhân tạo",
    userId: "user_1",
    authorName: "Nguyễn Văn A",
    createdAt: "2025-06-30T14:00:00Z",
    mainImage: "https://source.unsplash.com/random/800x400?technology",
    summary: "Bài viết này giới thiệu tổng quan về trí tuệ nhân tạo (AI) và ứng dụng trong đời sống.",
    content: "Trí tuệ nhân tạo đang ngày càng phát triển và ảnh hưởng mạnh mẽ đến nhiều lĩnh vực như y tế, giáo dục, giao thông,...",
    section1: "AI có thể học hỏi từ dữ liệu, đưa ra quyết định thông minh và tự động hóa quy trình.",
    subImage: "https://source.unsplash.com/random/600x300?ai",
    section2: "Một số nhánh của AI bao gồm: machine learning, deep learning, NLP,...",
  };

  const recentBlogs: Blog[] = [
    {
      id: 2,
      title: "Hướng dẫn học React cơ bản",
      userId: "user_2",
      authorName: "Trần Thị B",
      createdAt: "2025-06-28T10:00:00Z",
      mainImage: "",
      summary: "",
    },
    {
      id: 3,
      title: "Sử dụng Tailwind CSS trong dự án",
      userId: "user_3",
      authorName: "Lê Văn C",
      createdAt: "2025-06-25T08:30:00Z",
      mainImage: "",
      summary: "",
    },
  ];

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
          <p className="text-sm mb-6">
            {blog.authorName} |{" "}
            <time dateTime={blog.createdAt}>
              {new Date(blog.createdAt).toLocaleString("vi-VN")}
            </time>
          </p>

          <div className="text-lg mb-6 whitespace-pre-line">{blog.summary}</div>

          {blog.content && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Nội dung bài viết</h2>
              <p className="text-base leading-7 whitespace-pre-line">{blog.content}</p>
            </section>
          )}

          {blog.section1 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Nội dung chính</h2>
              <p className="text-base leading-7 whitespace-pre-line">{blog.section1}</p>
            </section>
          )}

          {blog.subImage && (
            <div className="my-6">
              <img
                src={getImageUrl(blog.subImage)}
                alt="Ảnh phụ"
                className="w-full rounded shadow"
              />
            </div>
          )}

          {blog.section2 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Thông tin bổ sung</h2>
              <p className="text-base leading-7 whitespace-pre-line">{blog.section2}</p>
            </section>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;

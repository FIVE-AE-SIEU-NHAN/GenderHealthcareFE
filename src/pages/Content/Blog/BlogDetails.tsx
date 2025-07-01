// src/pages/BlogDetails.tsx (hoặc bất cứ đâu bạn đặt file này)

import React from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Import hook và type từ các file đã tạo
import { useBlogDetail } from "@/hooks/customer/useBlog";
import { Blog } from "@/types";

// Import các component UI (ví dụ: Skeleton từ Shadcn UI)
import { Skeleton } from "@/components/ui/skeleton"; // Giả sử bạn dùng Shadcn UI

// ----- PHẦN DỮ LIỆU CỨNG GIỮ LẠI -----
// (Bạn có thể fetch API cho phần này trong tương lai)
interface RecentBlog {
  id: string; // Đổi id thành string để nhất quán
  title: string;
  authorName: string;
}

const recentBlogs: RecentBlog[] = [
  {
    id: "d4f3b2a1-6c8d-4e5b-9f0a-1b2c3d4e5f6g", // ID ví dụ
    title: "Basic React Learning Guide",
    authorName: "Tran Thi B",
  },
  {
    id: "e5g4c3b2-7d9e-5f6c-a0b1-2c3d4e5f6g7h", // ID ví dụ
    title: "Using Tailwind CSS in Projects",
    authorName: "Le Van C",
  },
  {
    id: "f6h5d4c3-8e0f-6g7d-b1c2-3d4e5f6g7h8i", // ID ví dụ
    title: "Next.js 14 Overview",
    authorName: "Pham Van D",
  },
];

// ----- COMPONENT -----

const BlogDetails: React.FC = () => {
  // 1. Lấy ID từ URL, ví dụ: /blog/detail/cf2a702f-52fb-11f0-bfde-0242ac110002
  const { id } = useParams<{ id: string }>();

  // 2. Gọi hook để fetch dữ liệu. Hook sẽ tự động chạy khi `id` có giá trị.
  const { data: blog, isLoading, isError, error } = useBlogDetail(id);

  // 3. Hàm xử lý URL hình ảnh từ API (có thể cần base URL của BE)
  const getImageUrl = (path?: string) => {
    if (!path) return "https://via.placeholder.com/800x400?text=No+Image"; // Ảnh mặc định
    // Giả sử API trả về đường dẫn tương đối như '/images/cover.png'
    // và BE của bạn đang chạy ở http://localhost:3000
    // Bạn nên lưu base URL này vào file .env
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    return `${API_BASE_URL}${path}`;
  };

  // 4. Xử lý trạng thái LOADING
  // Hiển thị skeleton UI để có trải nghiệm người dùng tốt hơn
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="w-full h-[400px] rounded-xl mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <Skeleton className="md:col-span-1 h-[200px] rounded" />
          <div className="md:col-span-3 space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // 5. Xử lý trạng thái LỖI
  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        <h2 className="text-2xl font-bold">Oops! An error occurred.</h2>
        <p>{error?.message || "Unable to load blog data."}</p>
      </div>
    );
  }

  // 6. Xử lý trường hợp không tìm thấy bài viết (API trả về null/undefined)
  if (!blog) {
    return (
       <div className="text-center py-20">
        <h2 className="text-2xl font-bold">404 - Article Not Found</h2>
        <p>The article you are looking for does not exist or has been deleted.</p>
        <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Blog Page
        </Link>
      </div>
    )
  }

  // 7. Render UI với dữ liệu từ API khi thành công
  return (
    <div className="font-sans text-gray-800 max-w-7xl mx-auto px-4 py-8">
      {/* Ảnh banner lớn */}
      <div className="w-full h-[400px] mb-12">
        <img
          src={getImageUrl(blog.cover_image)}
          alt={blog.title}
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Cột trái: Recent blogs (giữ nguyên code cứng) */}
        <aside className="md:col-span-1 border p-6 rounded-lg shadow h-fit sticky top-24">
          <h4 className="font-bold text-xl mb-4 border-b pb-2">🕘 Recent Articles</h4>
          <ul className="space-y-4 mt-4">
            {recentBlogs.map((b) => (
              <li key={b.id}>
                <Link
                  to={`/blog/detail/${b.id}`} // Đảm bảo route của bạn là /blog/detail/:id
                  className="block group"
                >
                  <p className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    {b.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {b.authorName || "Unknown"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Cột phải: Nội dung chi tiết blog từ API */}
        <article className="md:col-span-3 prose lg:prose-xl max-w-none">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">{blog.title}</h1>
          <div className="text-sm text-gray-500 mb-6 flex items-center gap-4">
            <span>Author: <strong className="font-semibold text-gray-700">{blog.author_name}</strong></span>
            <span>|</span>
            <time dateTime={blog.created_at}>
              {format(new Date(blog.created_at), "dd 'of' MMMM, yyyy", { locale: vi })}
            </time>
          </div>

          <p className="lead text-xl text-gray-600 mb-8">{blog.summary}</p>

          <div className="mb-6">
            <p>{blog.content}</p>
          </div>

          {blog.section_1 && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold mt-8 mb-4">{blog.section_1}</h2>
              {blog.main_image && (
                 <img
                    src={getImageUrl(blog.main_image)}
                    alt={blog.section_1}
                    className="w-full rounded-lg shadow my-6"
                 />
              )}
              {/* Giả sử section_1 có nội dung đi kèm, nếu không có bạn có thể bỏ thẻ p */}
              {/* <p>{nội dung cho section 1}</p> */}
            </section>
          )}

          {blog.section_2 && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold mt-8 mb-4">{blog.section_2}</h2>
              {blog.sub_image && (
                <img
                    src={getImageUrl(blog.sub_image)}
                    alt={blog.section_2}
                    className="w-full rounded-lg shadow my-6"
                />
              )}
              {/* <p>{nội dung cho section 2}</p> */}
            </section>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
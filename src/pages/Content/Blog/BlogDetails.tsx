import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaFacebookF, FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { format } from 'date-fns'; // Import hàm format từ date-fns

// 1. Import hook useBlogDetail bạn đã tạo
import { useBlogDetail } from '@/hooks/customer/useBlogs'; 

// Dữ liệu tĩnh cho Recent Blogs (giữ nguyên theo yêu cầu)
const mockRecentBlogs = [
  { id: 2, title: 'Tại sao nên tập yoga buổi sáng?', authorName: 'Anna Nguyễn' },
  { id: 3, title: 'Thực đơn ăn sạch cho tuần mới', authorName: 'Chef Long' },
  { id: 4, title: '10 phút thiền giúp giảm stress', authorName: 'Minh Thiền' },
  { id: 5, title: 'Ngủ ngon hơn với thói quen lành mạnh', authorName: 'Dr. Tâm An' },
];

const BlogDetails: React.FC = () => {
  // 2. Lấy `id` từ URL, đây là đầu vào cho hook của chúng ta
  const { id } = useParams<{ id: string }>();

  // 3. Gọi hook useBlogDetail để lấy dữ liệu, trạng thái loading và error
  const { data: blog, isLoading, isError, error } = useBlogDetail(id);

  // 4. Xử lý trạng thái Loading: Hiển thị thông báo trong khi chờ API
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Đang tải bài viết...</div>
      </div>
    );
  }

  // 5. Xử lý trạng thái Error: Hiển thị lỗi nếu API gặp sự cố
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">
          Lỗi: Không thể tải được dữ liệu bài viết.
          <p className="text-sm text-gray-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  // 6. Xử lý trường hợp không tìm thấy bài viết sau khi đã load xong
  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Không tìm thấy bài viết.</div>
      </div>
    );
  }

  // 7. Render giao diện với dữ liệu thật từ API
  return (
    <div className="font-inter text-gray-800 max-w-7xl mx-auto px-4 py-8">
      {/* Sử dụng key `cover_image` từ API */}
      <div className="w-full h-[400px] mb-12">
        <img
          src="/images/cover.jpg"
          alt={blog.title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <aside className="md:col-span-1 border p-6 rounded shadow h-fit">
          <h4 className="font-bold text-xl mb-4">Bài viết gần đây</h4>
          <ul className="space-y-4">
            {mockRecentBlogs.map((b) => (
              <li key={b.id}>
                <Link to={`/blog/${b.id}`} className="block text-blue-600 hover:underline">
                  <p className="font-medium">{b.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{b.authorName}</p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <article className="md:col-span-3">
          {/* Tất cả các trường dưới đây đều lấy từ object `blog` trả về từ API */}
          <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
          <p className="text-sm mb-6">
            {blog.author_name} |{' '}
            <time dateTime={blog.created_at}>
              {format(new Date(blog.created_at), "dd/MM/yyyy 'lúc' HH:mm")}
            </time>
          </p>

          <div className="text-lg mb-6 whitespace-pre-line">{blog.summary}</div>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Nội dung bài viết</h2>
            <p className="text-base leading-7 whitespace-pre-line">{blog.content}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Nội dung chính</h2>
            <p className="text-base leading-7 whitespace-pre-line">{blog.section_1}</p>
          </section>

          {blog.sub_image && (
            <div className="my-6">
              <img
                src={blog.sub_image}
                alt="Ảnh phụ"
                className="w-full rounded shadow"
              />
            </div>
          )}

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Thông tin bổ sung</h2>
            <p className="text-base leading-7 whitespace-pre-line">{blog.section_2}</p>
          </section>

          {/* Phần chia sẻ, like, comment giữ nguyên */}
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

          {/* Các phần UI tương tác khác giữ nguyên */}
          <div className="flex items-center gap-2 mb-8">{/*...Nút Like...*/}</div>
          <div className="bg-gray-50 rounded-lg p-6 mb-8">{/*...Phần Comment...*/}</div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
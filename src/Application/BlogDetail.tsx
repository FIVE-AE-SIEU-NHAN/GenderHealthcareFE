import React from "react";

const BlogDetails: React.FC = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Banner */}
      <section className="bg-blue-100 py-8 text-center">
        <h2 className="text-3xl font-bold">Chi tiết bài viết</h2>
        <p className="text-sm text-gray-600 mt-1">Trang chủ &gt; Blog &gt; Chi tiết bài viết</p>
      </section>

      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold">Tựa đề bài viết chính</h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
            <span>✍️ Tác giả: Nguyễn Văn A</span>
            <span>📅 20/05/2025</span>
            <span>🏷️ Tags: Sức khỏe, Y tế</span>
          </div>

          {/* Table of contents */}
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">Mục lục</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Nội dung chính</li>
              <li>Tổng quan về vấn đề</li>
              <li>Phân tích chi tiết</li>
              <li>Kết luận</li>
            </ul>
          </div>

          {/* Summary */}
          <div>
            <h3 className="font-semibold text-xl mb-2">Tóm tắt nội dung</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Đây là phần mô tả tóm tắt nội dung bài viết giúp người đọc nắm nhanh thông tin quan trọng.
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">1. Nội dung chính</h3>
            <p className="text-gray-700 text-sm mb-3">
              Nội dung chi tiết phần chính của bài viết trình bày ở đây. Có thể chứa các phân tích hoặc thông tin chuyên sâu.
            </p>
            <img src="/images/demo1.jpg" alt="" className="rounded w-full" />
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">2. Phân tích chi tiết</h3>
            <p className="text-gray-700 text-sm mb-3">
              Đây là phần mở rộng thông tin kèm dẫn chứng, hình ảnh hoặc đồ thị.
            </p>
            <img src="/images/demo2.jpg" alt="" className="rounded w-full" />
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">3. Kết luận</h3>
            <p className="text-gray-700 text-sm">
              Tóm gọn lại ý chính, đưa ra kết luận và lời khuyên cuối bài viết.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg mb-2">Bài viết liên quan</h4>
          <ul className="space-y-3 text-sm">
            <li className="border-b pb-2">
              <a href="#" className="hover:text-blue-500 font-medium">🔹 Làm thế nào để sống khỏe hơn mỗi ngày?</a>
            </li>
            <li className="border-b pb-2">
              <a href="#" className="hover:text-blue-500 font-medium">🔹 Thực phẩm tăng cường miễn dịch</a>
            </li>
            <li className="border-b pb-2">
              <a href="#" className="hover:text-blue-500 font-medium">🔹 Dấu hiệu nhận biết bệnh từ sớm</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 font-medium">🔹 Vai trò của khám sức khỏe định kỳ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

import React, { useEffect, useState } from 'react';
import BlogEdit from './BlogEdit'; // Import BlogEdit component (giờ đây đóng vai trò là modal)

// Định nghĩa interface Blog
// Tương tự, bạn nên có một file interfaces.ts để quản lý các interfaces chung.
interface Blog {
  id: number;
  userId?: string;
  title: string;
  summary?: string;
  content?: string;
  section1?: string;
  section2?: string;
  mainImage?: string;
  subImage?: string;
  image?: string;
  createdAt?: string | Date;
  authorName?: string;
}

const API_URL = 'http://localhost:3000/api/blogs'; // URL API của bạn

const Dashboardbloglist: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State để điều khiển việc hiển thị/ẩn modal BlogEdit
  const [showEditModal, setShowEditModal] = useState(false);
  // State để lưu ID của blog đang được chỉnh sửa (hoặc null nếu là tạo mới)
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);

  // Hàm tải danh sách blog từ API
  const fetchBlogs = () => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: Blog[]) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi khi tải danh sách blog');
        setLoading(false);
      });
  };

  // useEffect để tải blog khi component mount lần đầu
  useEffect(() => {
    fetchBlogs();
  }, []); // [] đảm bảo chỉ chạy một lần khi component được render lần đầu

  // Hàm xử lý khi nhấn nút "Sửa"
  const handleEdit = (id: number) => {
    setEditingBlogId(id); // Set ID của blog cần chỉnh sửa
    setShowEditModal(true); // Hiển thị modal BlogEdit
  };

  // Hàm xử lý khi nhấn nút "Thêm mới"
  const handleAddNew = () => {
    setEditingBlogId(null); // Đặt ID là null để BlogEdit biết là tạo mới
    setShowEditModal(true); // Hiển thị modal BlogEdit
  };

  // Hàm xử lý đóng modal BlogEdit
  const handleCloseModal = () => {
    setShowEditModal(false); // Ẩn modal
    setEditingBlogId(null); // Reset ID khi đóng
  };

  // Hàm xử lý xóa blog
  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa blog này?')) return; // Xác nhận trước khi xóa
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Xóa thất bại');
      
      fetchBlogs(); // Tải lại danh sách blog sau khi xóa thành công
    } catch {
      alert('Lỗi khi xóa blog');
    }
  };

  // Hiển thị trạng thái tải hoặc lỗi
  if (loading) return <div className="p-4 text-center text-gray-600">Đang tải danh sách blog...</div>;
  if (error) return <div className="p-4 text-center text-red-600 font-medium">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Blog</h1>
        <button
          onClick={handleAddNew} // Kích hoạt modal tạo mới
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Thêm mới
        </button>
      </div>

      {/* Hiển thị thông báo nếu không có blog nào */}
      {blogs.length === 0 ? (
        <div className="text-center p-8 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 shadow-sm">
          <p className="text-lg mb-4">Chưa có blog nào được đăng.</p>
          <button
            onClick={handleAddNew}
            className="mt-4 bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition duration-200 shadow"
          >
            Tạo blog đầu tiên của bạn!
          </button>
        </div>
      ) : (
        // Bảng hiển thị danh sách blog
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="p-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-600">Tiêu đề</th>
              <th className="p-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-600">Tác giả</th>
              <th className="p-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-600">Ngày tạo</th>
              <th className="p-3 border-b border-gray-300 text-center text-sm font-semibold text-gray-600">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="p-3 border-b border-gray-300 text-sm text-gray-700">{blog.id}</td>
                <td className="p-3 border-b border-gray-300 text-sm text-gray-800 font-medium">{blog.title}</td>
                <td className="p-3 border-b border-gray-300 text-sm text-gray-700">{blog.authorName || 'Không rõ'}</td>
                <td className="p-3 border-b border-gray-300 text-sm text-gray-600">
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString('vi-VN')
                    : '-'}
                </td>
                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  <a
                    href={`/blog/${blog.id}`}
                    target="_blank" // Mở trong tab mới
                    rel="noopener noreferrer" // Bảo mật
                    className="text-blue-600 hover:underline text-sm"
                    title="Xem chi tiết blog"
                  >
                    Xem
                  </a>
                  <button
                    onClick={() => handleEdit(blog.id)} // Kích hoạt modal chỉnh sửa với ID của blog
                    className="text-green-600 hover:underline text-sm"
                    title="Sửa blog"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 hover:underline text-sm"
                    title="Xóa blog"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Conditional Rendering của BlogEdit (khi là modal) */}
      {showEditModal && (
        <BlogEdit
          blogId={editingBlogId} // Truyền ID của blog cần chỉnh sửa (hoặc null cho tạo mới)
          onClose={handleCloseModal} // Truyền hàm để đóng modal
          onSaveSuccess={fetchBlogs} // Truyền hàm để dashboard refresh dữ liệu sau khi lưu
        />
      )}
    </div>
  );
};

export default Dashboardbloglist;
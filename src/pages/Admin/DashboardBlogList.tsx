import React, { useEffect, useState } from 'react';

// Định nghĩa interface Blog ngay trong file này
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

const API_URL = 'http://localhost:3000/api/blogs';

const BlogDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm tải danh sách blog
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

  useEffect(() => {
    fetchBlogs();
  }, []);

  
  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa blog này?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Xóa thất bại');
    
      fetchBlogs();
    } catch {
      alert('Lỗi khi xóa blog');
    }
  };

  if (loading) return <div className="p-4">Đang tải danh sách blog...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard Blog</h1>
        <a
          href="/blogs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Thêm mới
        </a>
      </div>

      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b border-gray-300 text-left">ID</th>
            <th className="p-3 border-b border-gray-300 text-left">Tiêu đề</th>
            <th className="p-3 border-b border-gray-300 text-left">Tác giả</th>
            <th className="p-3 border-b border-gray-300 text-left">Ngày tạo</th>
            <th className="p-3 border-b border-gray-300 text-center">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                Chưa có blog nào.
              </td>
            </tr>
          ) : (
            blogs.map(blog => (
              <tr key={blog.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{blog.id}</td>
                <td className="p-3 border-b border-gray-300">{blog.title}</td>
                <td className="p-3 border-b border-gray-300">{blog.authorName || 'Không rõ'}</td>
                <td className="p-3 border-b border-gray-300">
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : '-'}
                </td>
                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  <a
                    href={`/blog/${blog.id}`}
                    className="text-blue-600 hover:underline"
                    title="Xem chi tiết"
                  >
                    View
                  </a>
                  <a
                    href={`/blog/edit/${blog.id}`}
                    className="text-green-600 hover:underline"
                    title="Sửa"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 hover:underline"
                    title="Xóa"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogDashboard;

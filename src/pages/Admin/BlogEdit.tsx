import React, { useEffect, useState } from 'react';

// Định nghĩa interface Blog (có thể dùng chung một file interfaces.ts nếu dự án lớn)
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

interface BlogEditProps {
  blogId: number | null;
  onClose: () => void;
  onSaveSuccess: () => void;
}

const API_URL = 'http://localhost:3000/api/blogs';

const BlogEdit: React.FC<BlogEditProps> = ({ blogId, onClose, onSaveSuccess }) => {
  const [blogData, setBlogData] = useState<Blog>({
    id: 0,
    title: '',
    userId: '8f7d7123-4217-4c18-a4d1-e3ec197d1ab0', // Thay bằng userId thật
    summary: '',
    content: '',
    section1: '',
    section2: '',
    mainImage: '',
    subImage: '',
    image: '',
    authorName: 'Admin', // Thay bằng tên tác giả thật
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (blogId) {
      setLoading(true);
      setError(null);
      fetch(`${API_URL}/${blogId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch blog for editing');
          return res.json();
        })
        .then(data => {
          setBlogData(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Lỗi khi tải dữ liệu blog: ' + err.message);
          setLoading(false);
        });
    } else {
      setBlogData({
        id: 0,
        title: '',
        userId: '8f7d7123-4217-4c18-a4d1-e3ec197d1ab0',
        summary: '',
        content: '',
        section1: '',
        section2: '',
        mainImage: '',
        subImage: '',
        image: '',
        authorName: 'Admin',
      });
    }
  }, [blogId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBlogData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const method = blogData.id ? 'PUT' : 'POST';
    const url = blogData.id ? `${API_URL}/${blogData.id}` : API_URL;

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Lưu blog thất bại (${res.status})`);
      }

      alert(blogData.id ? 'Cập nhật blog thành công!' : 'Tạo blog mới thành công!');
      onSaveSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Thay đổi chính ở đây: dùng backdrop-filter và background-color với alpha thấp
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Nền đen mờ 40%
        backdropFilter: 'blur(8px)',          // Làm mờ nội dung phía sau 8px
        WebkitBackdropFilter: 'blur(8px)'     // Dành cho Safari
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{blogId ? 'Chỉnh sửa Blog' : 'Tạo Blog Mới'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none font-semibold transition-colors"
            aria-label="Đóng"
          >
            &times;
          </button>
        </div>

        {loading && <p className="text-center text-blue-500 my-4">Đang tải...</p>}
        {error && <p className="text-center text-red-600 my-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              id="title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Tóm tắt</label>
            <textarea
              id="summary"
              name="summary"
              value={blogData.summary || ''}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Nội dung chính</label>
            <textarea
              id="content"
              name="content"
              value={blogData.content || ''}
              onChange={handleChange}
              rows={6}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="section1" className="block text-sm font-medium text-gray-700">Mục con 1 (ví dụ: "Tiêu đề: Nội dung chi tiết...")</label>
            <textarea
              id="section1"
              name="section1"
              value={blogData.section1 || ''}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="section2" className="block text-sm font-medium text-gray-700">Mục con 2 (ví dụ: "Tiêu đề: Nội dung chi tiết...")</label>
            <textarea
              id="section2"
              name="section2"
              value={blogData.section2 || ''}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700">URL ảnh chính</label>
            <input
              type="text"
              id="mainImage"
              name="mainImage"
              value={blogData.mainImage || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="subImage" className="block text-sm font-medium text-gray-700">URL ảnh phụ</label>
            <input
              type="text"
              id="subImage"
              name="subImage"
              value={blogData.subImage || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Đang lưu...' : (blogId ? 'Cập nhật' : 'Thêm mới')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEdit;
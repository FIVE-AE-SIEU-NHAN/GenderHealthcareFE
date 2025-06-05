import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/blogs';

type FormData = {
  title: string;
  summary?: string;
  content?: string;
  section1?: string;
  section2?: string;
  mainImage?: string;
  subImage?: string;
  authorName?: string;
};

const BlogEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        reset(data);
        setLoading(false);
      })
      .catch(() => {
        alert('Không thể tải dữ liệu blog');
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Cập nhật blog thất bại');
      navigate('/blogs');
    } catch (error) {
      alert('Lỗi khi cập nhật blog');
    }
  };

  if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('title', { required: 'Tiêu đề là bắt buộc' })} placeholder="Tiêu đề" className="w-full p-2 border rounded" />
        <input {...register('summary')} placeholder="Tóm tắt" className="w-full p-2 border rounded" />
        <textarea {...register('content')} placeholder="Nội dung chính" className="w-full p-2 border rounded h-32" />
        <textarea {...register('section1')} placeholder="Phần 1" className="w-full p-2 border rounded h-24" />
        <textarea {...register('section2')} placeholder="Phần 2" className="w-full p-2 border rounded h-24" />
        <input {...register('mainImage')} placeholder="Link ảnh chính" className="w-full p-2 border rounded" />
        <input {...register('subImage')} placeholder="Link ảnh phụ" className="w-full p-2 border rounded" />
        <input {...register('authorName')} placeholder="Tên tác giả" className="w-full p-2 border rounded" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Cập nhật</button>
      </form>
    </div>
  );
};

export default BlogEdit;
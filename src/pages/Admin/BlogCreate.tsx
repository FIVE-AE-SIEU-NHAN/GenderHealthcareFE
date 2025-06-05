import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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

const BlogCreate: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Tạo blog thất bại');
      navigate('/blogs');
    } catch (error) {
      alert('Lỗi khi tạo blog');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tạo blog mới</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('title', { required: 'Tiêu đề là bắt buộc' })} placeholder="Tiêu đề" className="w-full p-2 border rounded" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <input {...register('summary')} placeholder="Tóm tắt" className="w-full p-2 border rounded" />
        <textarea {...register('content')} placeholder="Nội dung chính" className="w-full p-2 border rounded h-32" />
        <textarea {...register('section1')} placeholder="Phần 1" className="w-full p-2 border rounded h-24" />
        <textarea {...register('section2')} placeholder="Phần 2" className="w-full p-2 border rounded h-24" />
        <input {...register('mainImage')} placeholder="Link ảnh chính" className="w-full p-2 border rounded" />
        <input {...register('subImage')} placeholder="Link ảnh phụ" className="w-full p-2 border rounded" />
        <input {...register('authorName')} placeholder="Tên tác giả" className="w-full p-2 border rounded" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Tạo</button>
      </form>
    </div>
  );
};

export default BlogCreate;
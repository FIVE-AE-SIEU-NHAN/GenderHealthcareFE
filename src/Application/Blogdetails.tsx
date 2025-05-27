import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Blog {
  id: number;
  title: string;
  author: string;
  image: string;
  created_at: string;
  content: string; // Giả sử API trả thêm content chi tiết bài viết
}

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:3000/api/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load blog details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-4">Loading blog details...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!blog) return <div className="p-4">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-inter">
      <Link to="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Blog List
      </Link>
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        <span>{blog.author}</span> |{" "}
        <time dateTime={blog.created_at}>
          {new Date(blog.created_at).toLocaleDateString()}
        </time>
      </div>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-80 object-cover rounded mb-6"
      />
      <div
        className="blog-content prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogDetails;

import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

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

interface Comment {
  id: number;
  blogId: number;
  parentId: number | null;
  authorName: string;
  content: string;
  createdAt: string;
  likes: number;
}

const getImageUrl = (url?: string) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `http://localhost:3000/uploads/${url}`;
};

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [newCommentContent, setNewCommentContent] = useState<string>("");

  const replyTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // Fetch blog details
    fetch(`http://localhost:3000/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi fetch blog");
        return res.json();
      })
      .then((data) => {
        setBlog(data);
      })
      .catch((err) => {
        console.error("Fetch blog error:", err);
        setBlog(null);
      })
      .finally(() => setLoading(false));

    // Fetch recent blogs
    fetch("http://localhost:3000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        const recent = data.slice(0, 5);
        setRecentBlogs(recent);
      })
      .catch((err) => console.error("Fetch recent blogs error:", err));

    // Fetch comments from backend API
    fetch(`http://localhost:3000/api/blogs/${id}/comments`)
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi fetch comments");
        return res.json();
      })
      .then((data: Comment[]) => {
        setComments(data);
      })
      .catch((err) => {
        console.error("Fetch comments error:", err);
        setComments([]);
      });
  }, [id]);

  useEffect(() => {
    if (replyingTo !== null && replyTextareaRef.current) {
      replyTextareaRef.current.focus();
    }
  }, [replyingTo]);

  const getReplies = (commentId: number) =>
    comments.filter((c) => c.parentId === commentId);

  const handleLike = (commentId: number) => {
    // Nếu muốn lưu lên backend, gọi API update like tại đây
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  // Gửi comment/reply lên backend
  const postComment = async (comment: Omit<Comment, "id" | "createdAt" | "likes">) => {
    try {
      const res = await fetch(`http://localhost:3000/api/blogs/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (!res.ok) throw new Error("Lỗi khi gửi bình luận");
      const savedComment: Comment = await res.json();
      setComments((prev) => [...prev, savedComment]);
      setNewCommentContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Post comment error:", error);
      alert("Không gửi được bình luận, vui lòng thử lại.");
    }
  };

  const handleSubmitComment = () => {
    if (!newCommentContent.trim() || !blog) return;

    const commentToPost = {
      blogId: blog.id,
      parentId: replyingTo,
      authorName: "Bạn", // Bạn nên lấy tên user thật hoặc từ auth
      content: newCommentContent.trim(),
    };

    postComment(commentToPost);
  };

  if (loading) return <div className="p-8">Đang tải bài viết...</div>;
  if (!blog) return <div className="p-8 text-red-500">Không tìm thấy bài viết.</div>;

  const CommentItem: React.FC<{ comment: Comment; level?: number }> = ({
    comment,
    level = 0,
  }) => {
    const replies = getReplies(comment.id);

    return (
      <div
        className={`border rounded-md p-4 mb-3 ${
          level > 0 ? "bg-gray-50 ml-8" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{comment.authorName}</p>
            <p className="text-sm whitespace-pre-line">{comment.content}</p>
            <time className="text-xs text-gray-400 mt-1" dateTime={comment.createdAt}>
              {new Date(comment.createdAt).toLocaleString("vi-VN")}
            </time>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLike(comment.id)}
              className="flex items-center space-x-1 text-red-500 hover:text-red-600"
              title="Thả tim"
              aria-label="Thả tim"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{comment.likes}</span>
            </button>
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="text-blue-600 hover:underline"
              aria-expanded={replyingTo === comment.id}
              type="button"
            >
              Trả lời
            </button>
          </div>
        </div>

        {replyingTo === comment.id && (
          <div className="mt-3">
            <textarea
              ref={replyTextareaRef}
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              rows={3}
              className="w-full border rounded-md p-2"
              placeholder={`Trả lời ${comment.authorName}...`}
              aria-label={`Trả lời ${comment.authorName}`}
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button
                onClick={() => {
                  setReplyingTo(null);
                  setNewCommentContent("");
                }}
                className="px-3 py-1 border rounded-md hover:bg-gray-100"
                type="button"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitComment}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                disabled={!newCommentContent.trim()}
                type="button"
              >
                Gửi
              </button>
            </div>
          </div>
        )}

        {replies.length > 0 && (
          <div className="mt-4">
            {replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row gap-10">
      {/* Main content */}
      <div className="flex-1">
        <img
          src={getImageUrl(blog.mainImage)}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <div className="text-gray-500 mb-6">
          Tác giả: {blog.authorName} | Ngày đăng:{" "}
          {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
        </div>
        <p className="italic mb-6">{blog.summary}</p>
        {blog.content && <p className="mb-6 whitespace-pre-line">{blog.content}</p>}
        {blog.section1 && (
          <>
            <h2 className="text-2xl font-semibold mb-2">Mục lục</h2>
            <p className="mb-6 whitespace-pre-line">{blog.section1}</p>
          </>
        )}
        {blog.subImage && (
          <img
            src={getImageUrl(blog.subImage)}
            alt="Sub"
            className="w-full h-48 object-cover rounded-md mb-6"
          />
        )}
        {blog.section2 && (
          <p className="mb-6 whitespace-pre-line">{blog.section2}</p>
        )}

        {/* Comment section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Bình luận</h3>
          <textarea
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            rows={4}
            placeholder="Viết bình luận..."
            className="w-full border rounded-md p-3 mb-4"
            aria-label="Viết bình luận"
          />
          <div className="flex justify-end mb-6">
            <button
              onClick={handleSubmitComment}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!newCommentContent.trim()}
              type="button"
            >
              Gửi bình luận
            </button>
          </div>

          {/* Render comment list */}
          <div>
            {comments
              .filter((c) => c.parentId === null)
              .map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
          </div>
        </div>
      </div>

      {/* Sidebar recent blogs */}
      <aside className="w-80 hidden md:block sticky top-8 self-start">
        <h3 className="text-xl font-semibold mb-4">Bài viết gần đây</h3>
        <ul className="space-y-4">
          {recentBlogs.map((b) => (
            <li key={b.id}>
              <Link
                to={`/blog/${b.id}`}
                className="block font-medium text-blue-700 hover:underline"
              >
                {b.title}
              </Link>
              <time className="text-xs text-gray-400">
                {new Date(b.createdAt).toLocaleDateString("vi-VN")}
              </time>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default BlogDetails;

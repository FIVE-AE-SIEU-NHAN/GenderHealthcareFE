import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

// --- Interfaces ---
interface Blog {
  id: number;
  title: string;
  userId: string;
  authorName: string; // Tên tác giả (có thể được join từ bảng Users ở backend)
  createdAt: string;
  mainImage: string;
  summary: string;
  content?: string;
  subImage?: string;
  section1?: string;
  section2?: string;
  likes: number; 
  views: number; 
}

interface Comment {
  id: number;
  blogId: number;
  userId: string; // Thêm userId để biết ai bình luận
  authorName: string; // Tên người bình luận (backend cần join từ Users)
  type: 'COMMENT' | 'REPLY'; // Để phân biệt loại tương tác
  content: string;
  parentId: number | null;
  createdAt: string;
  likes: number; // Số lượt thích cho bình luận
}

// Interface mới cho người đã thích một bình luận hoặc bài viết
interface Liker {
  userId: string;
  userName: string;
  likedAt: string; // Dùng string vì JSON từ backend sẽ là string định dạng ISO
}

// --- Helper function for image URLs ---
const getImageUrl = (url?: string) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `http://localhost:3000/uploads/${url}`;
};

// --- Main BlogDetails Component ---
const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [newCommentContent, setNewCommentContent] = useState<string>("");

  // States mới cho tính năng hiển thị người đã thích bình luận
  const [hoveredCommentId, setHoveredCommentId] = useState<number | null>(null);
  const [commentLikers, setCommentLikers] = useState<Liker[]>([]);
  const [likersLoading, setLikersLoading] = useState<boolean>(false);

  // States mới cho tính năng hiển thị người đã thích bài viết
  const [blogLikers, setBlogLikers] = useState<Liker[]>([]);
  const [hoveredBlogLike, setHoveredBlogLike] = useState<boolean>(false);
  const [blogLikersLoading, setBlogLikersLoading] = useState<boolean>(false);

  const currentUser = {
    id: "8f7d7123-4217-4c18-a4d1-e3ec197d1ab0", // <-- Thay bằng ID người dùng thực tế đang đăng nhập
    name: "User hiện tại", // <-- Thay bằng tên người dùng thực tế
  };

  const replyTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Scroll to top when blog ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch blog details, recent blogs, and comments
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // --- Fetch Blog Details & Track View ---
    const fetchBlogData = async () => {
      try {
        const blogRes = await fetch(`http://localhost:3000/api/blogs/${id}`);
        if (!blogRes.ok) throw new Error("Lỗi khi fetch blog");
        const blogData: Blog = await blogRes.json();
        setBlog(blogData);

        // --- Track View (gửi yêu cầu riêng sau khi blog được fetch thành công) ---
        fetch(`http://localhost:3000/api/blogs/${id}/view`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: currentUser.id }),
        })
        .then(res => {
            if (!res.ok) {
                console.warn('Failed to track view:', res.statusText);
            }
        })
        .catch(err => console.warn('Er.ror tracking view:', err));

      } catch (err) {
        console.error("Fetch blog error:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    // --- Fetch Recent Blogs ---
    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/blogs");
        const data = await res.json();
        setRecentBlogs(data.slice(0, 5));
      } catch (err) {
        console.error("Fetch recent blogs error:", err);
      }
    };

    // --- Fetch Comments ---
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/blogs/${id}/comments`);
        if (!res.ok) throw new Error("Lỗi khi fetch comments");
        const data: Comment[] = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Fetch comments error:", err);
        setComments([]);
      }
    };

    fetchBlogData();
    fetchRecentBlogs();
    fetchComments(); // Fetch comments mỗi khi blog ID thay đổi

  }, [id, currentUser.id]);


  // Focus on reply textarea when replyingTo state changes
  useEffect(() => {
    if (replyingTo !== null && replyTextareaRef.current) {
      replyTextareaRef.current.focus();
    }
  }, [replyingTo]);

  // --- Comment Logic ---
  const getTopLevelComments = () => comments.filter((c) => c.type === 'COMMENT' && c.parentId === null);

  const getReplies = (commentId: number) =>
    comments.filter((c) => c.parentId === commentId && c.type === 'REPLY');

  // Hàm để fetch danh sách người thích cho một bình luận
  const fetchLikersForComment = async (commentId: number) => {
    setLikersLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/comments/${commentId}/likers`);
      if (!res.ok) throw new Error("Failed to fetch likers");
      const data: Liker[] = await res.json();
      setCommentLikers(data);
    } catch (error) {
      console.error("Error fetching likers:", error);
      setCommentLikers([]);
    } finally {
      setLikersLoading(false);
    }
  };

  // Hàm để fetch danh sách người thích cho bài viết
  const fetchLikersForBlog = async (blogId: number) => {
    setBlogLikersLoading(true);
    try {
      // Backend cần endpoint này, ví dụ: /api/blogs/:id/likers
      const res = await fetch(`http://localhost:3000/api/blogs/${blogId}/likers`);
      if (!res.ok) throw new Error("Failed to fetch blog likers");
      const data: Liker[] = await res.json();
      setBlogLikers(data);
    } catch (error) {
      console.error("Error fetching blog likers:", error);
      setBlogLikers([]);
    } finally {
      setBlogLikersLoading(false);
    }
  };


  const handleLikeComment = async (commentId: number) => {
    if (!currentUser.id) {
        alert("Bạn cần đăng nhập để thích bình luận.");
        return;
    }
    try {
        const res = await fetch(`http://localhost:3000/api/comments/${commentId}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: currentUser.id }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Lỗi khi thích bình luận");
        }

        setComments((prev) =>
            prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
        );
        // Sau khi like thành công, nếu đang hover thì cập nhật lại danh sách người thích
        if (hoveredCommentId === commentId) {
            fetchLikersForComment(commentId);
        }
    } catch (error) {
        console.error("Like comment error:", error);
        alert(error instanceof Error ? error.message : "Không thích được bình luận, vui lòng thử lại.");
    }
  };

  // --- Logic cho nút Like bài viết ---
  const handleLikeBlog = async () => {
    if (!currentUser.id) {
        alert("Bạn cần đăng nhập để thích bài viết.");
        return;
    }
    if (!blog) return;

    try {
        const res = await fetch(`http://localhost:3000/api/blogs/${blog.id}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: currentUser.id }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Lỗi khi thích bài viết");
        }

        setBlog((prevBlog) => {
            if (prevBlog) {
                return { ...prevBlog, likes: prevBlog.likes + 1 };
            }
            return null;
        });

        // Sau khi like thành công, nếu đang hover thì cập nhật lại danh sách người thích
        if (hoveredBlogLike) { // Sử dụng state mới
            fetchLikersForBlog(blog.id);
        }

    } catch (error) {
        console.error("Like blog error:", error);
        alert(error instanceof Error ? error.message : "Không thích được bài viết, vui lòng thử lại.");
    }
  };

  const postComment = async (comment: { blogId: number; userId: string; type: 'COMMENT' | 'REPLY'; content: string; parentId: number | null; }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/blogs/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (!res.ok) {
        const errorData = await res.json(); // Log lỗi từ backend
        console.error("Backend error response:", errorData);
        throw new Error(errorData.message || "Lỗi khi gửi bình luận");
      }
      const savedComment: Comment = await res.json(); // Backend cần trả về Comment object đầy đủ
      savedComment.authorName = savedComment.authorName || currentUser.name; // Tạm gán tên tác giả (thực tế backend nên trả về)
      savedComment.likes = savedComment.likes || 0; // Bình luận mới chưa có likes
      setComments((prev) => [...prev, savedComment]);
      setNewCommentContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Post comment error:", error);
      alert(error instanceof Error ? error.message : "Không gửi được bình luận, vui lòng thử lại.");
    }
  };

  const handleSubmitComment = () => {
    if (!newCommentContent.trim() || !blog) return;
    if (!currentUser.id) {
        alert("Bạn cần đăng nhập để bình luận.");
        return;
    }

    const commentType: 'COMMENT' | 'REPLY' = replyingTo !== null ? 'REPLY' : 'COMMENT';

    const commentToPost = {
      blogId: blog.id,
      userId: currentUser.id, // Gửi userId của người dùng hiện tại
      type: commentType,
      content: newCommentContent.trim(),
      parentId: replyingTo,
    };

    postComment(commentToPost);
  };

  // --- Rendering Logic ---
  if (loading) return <div className="p-8 text-center text-gray-600">Đang tải bài viết...</div>;
  if (!blog) return <div className="p-8 text-center text-red-500">Không tìm thấy bài viết.</div>;

  // Helper functions to extract title and body from section string
  const getSectionTitle = (sectionContent?: string) => {
    if (!sectionContent) return null;
    const parts = sectionContent.split(":");
    return parts.length > 0 ? parts[0].trim() : null;
  };

  const getSectionBody = (sectionContent?: string) => {
    if (!sectionContent) return null;
    const parts = sectionContent.split(":");
    return parts.length > 1 ? parts.slice(1).join(":").trim() : sectionContent.trim();
  };

  // Get processed titles and contents
  const section1Title = getSectionTitle(blog.section1);
  const section2Title = getSectionTitle(blog.section2);
  const section1Content = getSectionBody(blog.section1);
  const section2Content = getSectionBody(blog.section2);


  // Comment Item component
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
            {/* KHUNG HIỂN THỊ SỐ LƯỢT THÍCH VÀ POPUP */}
            <div
                className="relative" // Để popup có thể định vị tuyệt đối bên trong
                onMouseEnter={() => {
                    setHoveredCommentId(comment.id);
                    // Chỉ fetch nếu có likes để tránh request không cần thiết
                    if (comment.likes > 0) {
                        fetchLikersForComment(comment.id);
                    } else {
                        setCommentLikers([]); // Đảm bảo danh sách trống nếu không có likes
                    }
                }}
                onMouseLeave={() => {
                    setHoveredCommentId(null);
                    setCommentLikers([]); // Xóa danh sách khi chuột rời đi
                }}
            >
                <button
                    onClick={() => handleLikeComment(comment.id)}
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
                    {/* Đảm bảo hiển thị số likes là số hoặc 0 */}
                    <span>{comment.likes != null ? comment.likes : 0}</span>
                </button>

                {/* Popover hiển thị danh sách người thích */}
                {hoveredCommentId === comment.id && (
                    <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-3 text-sm text-gray-800">
                        {likersLoading ? (
                            <p>Đang tải...</p>
                        ) : commentLikers.length > 0 ? (
                            <ul>
                                {commentLikers.map((liker) => (
                                    <li key={liker.userId} className="py-1 border-b last:border-b-0 border-gray-100">
                                        {liker.userName}
                                        <span className="text-gray-400 text-xs ml-2">
                                            ({new Date(liker.likedAt).toLocaleDateString('vi-VN')})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Chưa có ai thích.</p>
                        )}
                    </div>
                )}
            </div>
            {/* END KHUNG HIỂN THỊ SỐ LƯỢT THÍCH VÀ POPUP */}

            <button
              onClick={() => {
                setReplyingTo(comment.id);
                setNewCommentContent('');
              }}
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
              className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
              placeholder={`Trả lời ${comment.authorName}...`}
              aria-label={`Trả lời ${comment.authorName}`}
              required
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button
                onClick={() => {
                  setReplyingTo(null);
                  setNewCommentContent("");
                }}
                className="px-3 py-1 border rounded-md hover:bg-gray-100 text-gray-700"
                type="button"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitComment}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
      {/* Main content area */}
      <div className="flex-1">
        <img
          src={getImageUrl(blog.mainImage)}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-md mb-4 shadow-sm"
        />
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{blog.title}</h1>
        <div className="text-gray-500 text-sm mb-6">
          Tác giả: <span className="font-medium">{blog.authorName}</span> | Ngày đăng:{" "}
          {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
        </div>
        <p className="italic mb-6 text-lg text-gray-700 leading-relaxed">{blog.summary}</p>

        {/* --- Table of Contents (Mục lục) --- */}
        {(blog.content || section1Title || section2Title) && (
          <div className="mb-8 p-5 border border-blue-200 rounded-lg bg-blue-50 shadow-sm">
            <h2 className="text-xl font-bold text-blue-800 mb-3">Mục lục</h2>
            <ul className="list-disc pl-6 space-y-2">
              {blog.content && (
                <li>
                  <a href="#intro-content" className="text-blue-700 hover:underline transition-colors duration-200">
                    Giới thiệu
                  </a>
                </li>
              )}
              {section1Title && (
                <li>
                  <a href="#section1-content" className="text-blue-700 hover:underline transition-colors duration-200">
                    {section1Title}
                  </a>
                </li>
              )}
              {section2Title && (
                <li>
                  <a href="#section2-content" className="text-blue-700 hover:underline transition-colors duration-200">
                    {section2Title}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
        {/* --- End Table of Contents --- */}

        {/* --- Blog Content Sections --- */}
        {blog.content && (
          <div id="intro-content" className="scroll-mt-20 mb-8">
            <h2 className="text-2xl font-semibold mb-3 mt-8 text-gray-800">Giới thiệu</h2>
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">{blog.content}</p>
          </div>
        )}

        {section1Content && (
          <div id="section1-content" className="scroll-mt-20 mb-8">
            <h2 className="text-2xl font-semibold mb-3 mt-8 text-gray-800">
              {section1Title || "Nội dung phần 1"}
            </h2>
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">{section1Content}</p>
          </div>
        )}

        {blog.subImage && (
          <img
            src={getImageUrl(blog.subImage)}
            alt="Hình ảnh phụ của bài viết"
            className="w-full h-48 object-cover rounded-md mb-8 shadow-sm"
          />
        )}

        {section2Content && (
          <div id="section2-content" className="scroll-mt-20 mb-8">
            <h2 className="text-2xl font-semibold mb-3 mt-8 text-gray-800">
              {section2Title || "Nội dung phần 2"}
            </h2>
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">{section2Content}</p>
          </div>
        )}
        {/* --- End Blog Content Sections --- */}

        {/* --- Social Share, Views, Comments, and Like Section --- */}
        <hr className="border-t border-gray-300 my-6" />
        <div className="flex justify-between items-center py-2 text-gray-600 text-sm">
          {/* Left side: Social Icons + Views/Comments */}
          <div className="flex items-center space-x-4">
            {/* Social Share Icons */}
            <div className="flex space-x-3 text-lg font-bold">
              <a href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" title="Chia sẻ lên Facebook" className="hover:text-blue-700">F</a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" title="Chia sẻ lên X">X</a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" title="Chia sẻ lên LinkedIn" className="hover:text-blue-700">In</a>
              <a href="#" onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Đã sao chép liên kết!'))} aria-label="Copy link" title="Sao chép liên kết" className="hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
              </a>
            </div>

            {/* Views and Comments Count */}
            <div className="flex space-x-3 ml-6 text-base">
              {/* Sử dụng nullish coalescing để tránh NaN */}
              <span>{blog.views != null ? blog.views : 0} views</span>
              <span>{comments.length} comments</span>
            </div>
          </div>

          {/* Right side: Blog Like Button with Popover */}
          <div
            className="relative" // Để popup có thể định vị tuyệt đối bên trong
            onMouseEnter={() => {
                setHoveredBlogLike(true);
                // Chỉ fetch nếu có likes và blog ID tồn tại
                if (blog.likes > 0 && blog.id) {
                    fetchLikersForBlog(blog.id);
                } else {
                    setBlogLikers([]); // Đảm bảo danh sách trống nếu không có likes
                }
            }}
            onMouseLeave={() => {
                setHoveredBlogLike(false);
                setBlogLikers([]); // Xóa danh sách khi chuột rời đi
            }}
          >
            <button
              onClick={handleLikeBlog}
              className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors duration-200"
              title="Thả tim cho bài viết"
              aria-label="Thả tim cho bài viết"
              type="button"
            >
              {/* Sử dụng nullish coalescing để tránh NaN */}
              <span className="text-xl font-bold">{blog.likes != null ? blog.likes : 0}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>

            {/* Popover hiển thị danh sách người thích bài viết */}
            {hoveredBlogLike && (
                <div className="absolute z-10 bottom-full right-0 mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-3 text-sm text-gray-800">
                    {blogLikersLoading ? (
                        <p>Đang tải...</p>
                    ) : blogLikers.length > 0 ? (
                        <ul>
                            {blogLikers.map((liker) => (
                                <li key={liker.userId} className="py-1 border-b last:border-b-0 border-gray-100">
                                    {liker.userName}
                                    <span className="text-gray-400 text-xs ml-2">
                                        ({new Date(liker.likedAt).toLocaleDateString('vi-VN')})
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Chưa có ai thích bài viết này.</p>
                    )}
                </div>
            )}
          </div>
        </div>
        <hr className="border-t border-gray-300 my-6" />

        {/* --- Comment Section --- */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-5 text-gray-800">Bình luận</h3>
          <textarea
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            rows={4}
            placeholder="Viết bình luận của bạn tại đây..."
            className="w-full border border-gray-300 rounded-md p-3 mb-4 resize-y focus:ring focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
            aria-label="Viết bình luận"
          />
          <div className="flex justify-end mb-6">
            <button
              onClick={handleSubmitComment}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={!newCommentContent.trim()}
              type="button"
            >
              Gửi bình luận
            </button>
          </div>

          {/* Render comment list */}
          <div>
            {getTopLevelComments()
              .map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            {getTopLevelComments().length === 0 && (
              <p className="text-gray-500 text-center py-4">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar for recent blogs */}
      <aside className="w-80 hidden md:block sticky top-8 self-start p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Bài viết gần đây</h3>
        <ul className="space-y-4">
          {recentBlogs.map((b) => (
            <li key={b.id}>
              <Link
                to={`/blog/${b.id}`}
                className="block font-medium text-blue-700 hover:underline hover:text-blue-800 transition-colors duration-200"
              >
                {b.title}
              </Link>
              <p className="text-sm text-gray-500 mt-0.5">
                {new Date(b.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default BlogDetails;
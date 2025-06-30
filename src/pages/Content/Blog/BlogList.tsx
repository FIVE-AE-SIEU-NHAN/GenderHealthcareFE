import { Link } from "react-router-dom";
import { useBlogsList } from "@/hooks/customer/useBlogs";
import { Blog } from "@/types";
import { useState } from "react";
import { Pagination } from "@/components/layouts/pagin";
import { Skeleton } from "@/components/ui/skeleton"; // Giả sử bạn có component Skeleton cho loading

/**
 * Skeleton Loader Component
 * Một component đơn giản để hiển thị khi dữ liệu đang tải
 */
const BlogListSkeleton = () => (
  <div className="p-5 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Skeleton cho Top Blog */}
      <section className="col-span-1 md:col-span-4 lg:col-span-1">
        <div className="rounded-lg border bg-white border-gray-200 p-4 h-full flex flex-col">
          <Skeleton className="w-full h-60 rounded mb-3" />
          <Skeleton className="h-8 w-3/4 mb-3" />
          <Skeleton className="h-4 w-1/2 mb-3" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </section>
      {/* Skeleton cho các Blog khác */}
      <section className="col-span-1 md:col-span-4 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="rounded-lg border bg-white border-gray-200 p-4 flex flex-col">
            <Skeleton className="w-full h-40 rounded mb-3" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </section>
    </div>
  </div>
);


/**
 * Blog Card Component
 * Component hiển thị thông tin của một bài blog
 */
const BlogCard = (blog: Blog) => {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="rounded-lg border bg-white border-gray-200 p-4 hover:shadow-lg transition-shadow flex flex-col col-span-1"
    >
      <img
        src={blog.cover_image}
        alt={blog.title}
        className="w-full h-40 object-cover object-top rounded mb-3 overflow-hidden"
      />
      <h3 className="font-semibold text-lg mb-1 flex-grow">
        {blog.title.length > 50 ? blog.title.slice(0, 50) + "..." : blog.title}
      </h3>
      <div className="flex flex-col text-sm text-gray-500 mt-auto pt-2">
        <div className="font-medium text-gray-700">{blog.author_name}</div>
        <time dateTime={blog.created_at}>
          {new Date(blog.created_at).toLocaleDateString("vi-VN")}
        </time>
      </div>
    </Link>
  );
};


/**
 * Main Blog Page Component
 */
const BlogPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{
    field: "created_at";
    direction: "asc" | "desc";
  }>({ field: "created_at", direction: "desc" });

  const LIMIT = 10;

  // ========== SỬ DỤNG HOOK ĐỂ LẤY DỮ LIỆU ==========
  const {
    data: blogData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useBlogsList({
    page,
    limit: LIMIT,
    // search
    sort,
  });

  // ========== RENDER TRẠNG THÁI LOADING ==========
  if (isLoading) {
    return (
      <>
        {/* Giữ lại Banner để người dùng biết đang ở trang nào */}
        <section className="py-12 text-center h-[350px] relative flex flex-col items-center justify-center bg-blue-900">
          <h2 className="text-5xl text-white font-bold">Our Blogs</h2>
          <p className="text-sm mt-2">
            <span className="text-white">Home</span>
            <span style={{ color: "#55AEFF" }}> / Blog List</span>
          </p>
        </section>
        <BlogListSkeleton />
      </>
    );
  }

  // ========== RENDER TRẠNG THÁI LỖI ==========
  if (isError) {
    return (
      <div className="p-5 max-w-7xl mx-auto text-center text-red-600">
        <h3 className="text-2xl font-bold">Đã có lỗi xảy ra</h3>
        <p>{error.message}</p>
      </div>
    );
  }
  
  // ========== XỬ LÝ DỮ LIỆU KHI THÀNH CÔNG ==========
  const blogs = blogData?.data || [];
  const totalBlogs = blogData?.total || 0;
  const totalPages = Math.ceil(totalBlogs / LIMIT);

  const topBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="font-inter text-gray-800 bg-gray-100">
      {/* Banner */}
      <section className="py-12 text-center h-[350px] relative flex flex-col items-center justify-center bg-blue-900">
        <h2 className="text-5xl text-white font-bold">Our Blogs</h2>
        <p className="text-sm mt-2">
          <span className="text-white">Home</span>
          <span style={{ color: "#55AEFF" }}> / Blog List</span>
        </p>
      </section>

      {/* Blog List */}
      <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
        {blogs.length > 0 ? (
          <section className="p-5 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {/* Bài viết nổi bật (Top 1) */}
              {topBlog && (
                <section className="col-span-1 md:col-span-4 lg:col-span-1">
                  <Link
                    to={`/blog/${topBlog.id}`}
                    className="rounded-lg border bg-white border-gray-200 p-4 hover:shadow-lg transition-shadow flex flex-col h-full"
                  >
                    <img
                      src={topBlog.main_image || topBlog.cover_image} // Ưu tiên main_image nếu có
                      alt={topBlog.title}
                      className="w-full h-60 object-cover object-top rounded mb-3 overflow-hidden"
                    />
                    <h3 className="font-semibold text-2xl mb-3">
                      {topBlog.title}
                    </h3>
                    <div className="flex flex-col text-sm text-gray-500 mb-3">
                      <div className="font-medium text-gray-700">{topBlog.author_name}</div>
                      <time dateTime={topBlog.created_at}>
                        {new Date(topBlog.created_at).toLocaleString("vi-VN")}
                      </time>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 flex-grow">
                      {topBlog.summary && topBlog.summary.length > 200
                        ? topBlog.summary.slice(0, 200) + "..."
                        : topBlog.summary}
                    </p>
                  </Link>
                </section>
              )}

              {/* Các bài viết còn lại */}
              <section className="col-span-1 md:col-span-4 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {otherBlogs.map((blog) => (
                  <BlogCard key={blog.id} {...blog} />
                ))}
              </section>
            </div>
          </section>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold">Không tìm thấy bài viết nào</h3>
            <p className="text-gray-500 mt-2">Vui lòng thử lại sau.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center pb-10">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
            className="mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default BlogPage;
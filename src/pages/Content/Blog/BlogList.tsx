import { Link } from "react-router-dom";
import { useBlogsList } from "@/hooks/customer/useBlogs";
import { Blog } from "@/types";
import { useState } from "react";
import { Pagination } from "@/components/layouts/pagin/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

// Skeleton component cho trạng thái loading
const BlogListSkeleton = () => (
  <div className="p-5 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
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

// Card component cho từng bài blog
const BlogCard = (blog: Blog) => (
  <Link
    to={`/blogs/${blog.id}`}
    className="rounded-lg border bg-white border-gray-200 p-4 hover:shadow-lg transition-shadow flex flex-col col-span-1"
  >
    <img
      src={blog.cover_image}
      alt={blog.title}
      className="w-full h-40 object-cover object-top rounded mb-3 overflow-hidden"
    />
    <h3 className="font-semibold text-lg mb-1 flex-grow">
      {blog.title.length > 50 ? blog.title.slice(0, 50) + '...' : blog.title}
    </h3>
    <div className="flex flex-col text-sm text-gray-500 mt-auto pt-2">
      <div className="font-medium text-gray-700">{blog.author_name}</div>
      <time dateTime={blog.created_at}>
        {new Date(blog.created_at).toLocaleDateString('vi-VN')}
      </time>
    </div>
  </Link>
);

const BlogPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ field: 'created_at'; direction: 'asc' | 'desc'; }>(
    { field: 'created_at', direction: 'desc' }
  );

  // State cho tìm kiếm
  const [searchInput, setSearchInput] = useState('');
  const [committedSearchTerm, setCommittedSearchTerm] = useState('');
  const LIMIT = 10;

  // Hook lấy danh sách blog
  const {
    data: blogData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useBlogsList({
    page,
    limit: LIMIT,
    sort,
    search: { field: 'title', value: committedSearchTerm },
  });

  // Xử lý tìm kiếm
  const handleSearch = () => {
    setCommittedSearchTerm(searchInput);
    setPage(1);
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <section
          className="py-12 text-center bg-cover bg-center h-[150px] relative flex flex-col items-center justify-center bg-[url('@/assets/images/blog1.webp')]"
        >
          <h2 className="text-5xl text-white font-bold">Our Blogs</h2>
          <p className="text-sm mt-2">
            <span className="text-white">Home</span>
            <span style={{ color: '#55AEFF' }}> / Blog List</span>
          </p>
        </section>
        <BlogListSkeleton />
      </>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-5 max-w-7xl mx-auto text-center text-red-600">
        <h3 className="text-2xl font-bold">An error occurred.</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  // Dữ liệu thành công
  const blogs = blogData?.data ?? [];
  const totalBlogs = blogData?.total ?? 0;
  const totalPages = Math.ceil(totalBlogs / LIMIT);
  const topBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="font-inter text-gray-800 bg-gray-100">
      {/* Banner */}
      <section
        className="py-12 text-center bg-cover bg-center h-[150px] relative flex flex-col items-center justify-center bg-[url('@/assets/images/blog1.webp')]"
      >
        <h2 className="text-5xl text-white font-bold">Our Blogs</h2>
        <p className="text-sm mt-2">
          <span className="text-white">Home</span>
          <span style={{ color: '#55AEFF' }}> / Blog List</span>
        </p>
      </section>

      {/* Khu vực Sort & Search */}
      <div className="max-w-7xl mx-auto p-5">
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant={sort.direction === 'desc' ? 'default' : 'outline'}
            onClick={() => { setSort({ field: 'created_at', direction: 'desc' }); setPage(1); }}
          >
            Latest
          </Button>
          <Button
            variant={sort.direction === 'asc' ? 'default' : 'outline'}
            onClick={() => { setSort({ field: 'created_at', direction: 'asc' }); setPage(1); }}
          >
            Oldest
          </Button>
          <div className="relative flex-1 md:flex-none flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search by title..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              className="h-11 w-full md:w-64"
            />
            <Button onClick={handleSearch} aria-label="Tìm kiếm">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
        {blogs.length > 0 ? (
          <section className="p-5 pt-0 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <section className="col-span-1 md:col-span-4 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {otherBlogs.map((blog) => (
                  <BlogCard key={blog.id} {...blog} />
                ))}
              </section>
            </div>
          </section>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold">No posts found!</h3>
            <p className="text-gray-500 mt-2">
              {committedSearchTerm
                ? `No results for keyword "${committedSearchTerm}".`
                : 'Please try again later.'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center pb-10">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          showJump={false}
          className="flex justify-center items-center px-16 w-full"
        />
      </div>
    </div>
  );
};

export default BlogPage;

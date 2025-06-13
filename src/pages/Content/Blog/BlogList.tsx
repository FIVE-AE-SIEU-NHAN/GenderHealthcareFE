import { Link } from "react-router-dom";
import { useBlogs } from "@/hooks/useBlogs";

export interface Blog {
  id: number
  userId: string
  title: string
  summary: string
  content: string
  section1: string
  section2: string
  mainImage: string
  subImage: string
  image: string
  createdAt: string
}

const BlogCard = (blog: Blog ) => {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="rounded-lg border border-gray-300 p-4 hover:shadow-lg transition-shadow flex flex-col col-span-1"
    >
      {/* Ảnh */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-40 object-cover object-top rounded mb-3 overflow-hidden"
      />

      {/* Tiêu đề */}
      {blog.title && (
        <h3 className="font-semibold text-lg mb-1">
          {blog.title.length > 50 ? blog.title.slice(0, 50) + '...' : blog.title}
        </h3>
      )}

      {/* Thông tin blog */}
      <div className="flex flex-col text-sm text-gray-500 mb-2">
        <div>Đang tải người dùng...</div>
        <time dateTime={blog.createdAt}>
          {new Date(blog.createdAt).toLocaleString()}
        </time>
      </div>

      {/* Tóm tắt */}
      {blog.summary && (
        <p className="text-sm text-gray-700 mb-2">
          {blog.summary.length > 100
            ? blog.summary.slice(0, 100) + '...'
            : blog.summary}
        </p>
      )}
    </Link>
  )
}

const BlogPage: React.FC = () => {
  const {
    data: blogs = [],
  } = useBlogs();

  return (
    <>
      {
        console.log("Blogs:", blogs)
      }
      <div className="font-inter text-gray-800 bg-gray-200">
        {/* Banner */}
        <section
            className="py-12 text-center bg-cover bg-center h-[350px] relative flex flex-col items-center justify-center bg-dark-blue"
          >
          <h2 className="text-5xl text-white font-bold">Our Blogs</h2>
          <p className="text-sm mt-2">
            <span className="text-white">Home</span>
            <span style={{ color: "#55AEFF" }}> / Blog List</span>
          </p>
        </section>

        {/* Blog List */}
        <section className="p-5 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4">
          {/* Top 1 Blog  */}
          <section className="mr-0 mb-5 md:mb-0 md:mr-5 mx-auto col-span-1 h-full">
            {blogs[0] && (
              <Link
                to={`/blog/${blogs[0]?.id}`}
                className="rounded-lg border border-gray-300 p-4 hover:shadow-lg transition-shadow flex flex-col col-span-1 h-[calc(100%-20px)] sm:h-full"
              >
                {/* Ảnh */}
                <img
                  src={blogs[0].image}
                  alt={blogs[0].title}
                  className="w-full h-70 object-cover object-top rounded mb-3 overflow-hidden"
                />


                {/* Tiêu đề */}
                {blogs[0].title && (
                  <h3 className="font-semibold text-4xl mb-3">
                    {blogs[0].title}
                  </h3>
                )}

                {/* Thông tin blog */}
                <div className="flex flex-col text-sm text-gray-500 mb-3">
                  <div>Đang tải người dùng...</div>
                  <time dateTime={blogs[0].createdAt}>
                    {new Date(blogs[0].createdAt).toLocaleString()}
                  </time>
                </div>

                {/* Tóm tắt */}
                {blogs[0].section1 && (
                  <p className="text-sm text-gray-700 mb-2">
                    {blogs[0].section1.length > 1000
                      ? blogs[0].section1.slice(0, 1000) + '...'
                      : blogs[0].section1}
                  </p>
                )}
              </Link>
            )}
          </section>
          {/* 9 Blog */}
          <section className="sm:col-span-3 mx-auto gap-5 grid grid-cols-1 md:grid-cols-3 col-span-1">
            {blogs.slice(1, 10).map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </section>
        </section>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 pb-5">
          <div className="p-3 border border-gray-300 rounded">1</div>
          <div className="p-3 border border-gray-300 rounded bg-dark-blue text-white">2</div>
          <div className="p-3 border border-gray-300 rounded">3</div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;

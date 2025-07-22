import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaFacebookF, FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { format } from 'date-fns';

// 1. Import hook useBlogDetail
import { useBlogDetail } from '@/hooks/customer/useBlogs'; 

// Static data for Recent Blogs
const mockRecentBlogs = [
  { id: 2, title: 'Why you should practice morning yoga?', authorName: 'Anna Nguyen' },
  { id: 3, title: 'Clean eating menu for the new week', authorName: 'Chef Long' },
  { id: 4, title: '10 minutes of meditation to reduce stress', authorName: 'Minh Zen' },
  { id: 5, title: 'Sleep better with healthy habits', authorName: 'Dr. Tam An' },
];

const BlogDetails: React.FC = () => {
  // 2. Get `id` from URL parameters
  const { id } = useParams<{ id: string }>();

  // 3. Call useBlogDetail hook to fetch data, loading state and error
  const { data: blog, isLoading, isError, error } = useBlogDetail(id);

  // 4. Handle Loading state: Show loading message while waiting for API
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-900">
        <div className="text-xl font-semibold text-slate-800 dark:text-slate-200">Loading article...</div>
      </div>
    );
  }

  // 5. Handle Error state: Show error message if API fails
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-900">
        <div className="text-xl font-semibold text-red-500">
          Error: Unable to load article data.
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{error?.message}</p>
        </div>
      </div>
    );
  }

  // 6. Handle case when article is not found after loading
  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-900">
        <div className="text-xl font-semibold text-slate-800 dark:text-slate-200">Article not found.</div>
      </div>
    );
  }

  // 7. Render interface with real data from API
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Cover Image */}
        <div className="w-full h-[400px] mb-12">
          <img
            src={blog.cover_image || "/images/cover.jpg"}
            alt={blog.title}
            className="w-full h-full object-cover rounded-xl shadow-lg bg-slate-200 dark:bg-slate-800"
            onError={(e) => {
              e.currentTarget.src = "/images/cover.jpg";
            }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Sidebar - Recent Blogs */}
          <aside className="md:col-span-1 bg-white dark:bg-slate-950 rounded-xl shadow-xl/20 border border-slate-200 dark:border-slate-800 p-6 h-fit">
            <h4 className="font-bold text-xl mb-4 text-slate-900 dark:text-slate-100">Recent Articles</h4>
            <ul className="space-y-5">
              {mockRecentBlogs.map((b) => (
                <li key={b.id}>
                  <Link 
                    to={`/blog/${b.id}`} 
                    className="block group"
                  >
                    <p className="font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                      {b.title}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {b.authorName}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Article Content */}
          <article className="md:col-span-3 bg-white dark:bg-slate-950 rounded-xl shadow-xl/20 border border-slate-200 dark:border-slate-800 p-8">
            {/* Article Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
                {blog.title}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                By {blog.author_name} |{' '}
                <time dateTime={blog.created_at}>
                  {format(new Date(blog.created_at), "MMMM dd, yyyy 'at' HH:mm")}
                </time>
              </p>
            </div>

            {/* Article Content */}
            <div className="space-y-10 text-slate-800 dark:text-slate-200">
              {/* Summary */}
              {blog.summary && (
                <blockquote className="text-lg/relaxed italic text-slate-700 dark:text-slate-300 border-l-4 border-blue-500 pl-6">
                  {blog.summary}
                </blockquote>
              )}

              {/* Main Content */}
              {blog.content && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Article Content
                  </h2>
                  <p className="text-base/relaxed whitespace-pre-line">
                    {blog.content}
                  </p>
                </section>
              )}

              {/* Section 1 */}
              {blog.section_1 && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Main Points
                  </h2>
                  <p className="text-base/relaxed whitespace-pre-line">
                    {blog.section_1}
                  </p>
                </section>
              )}

              {/* Sub Image */}
              {blog.sub_image && (
                <div className="my-8">
                  <img
                    src={blog.sub_image}
                    alt="Sub-image"
                    className="w-full rounded-xl shadow-md bg-slate-200 dark:bg-slate-800"
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder-image.svg";
                    }}
                  />
                </div>
              )}

              {/* Section 2 */}
              {blog.section_2 && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Additional Information
                  </h2>
                  <p className="text-base/relaxed whitespace-pre-line">
                    {blog.section_2}
                  </p>
                </section>
              )}
            </div>

            {/* Share, Like, Comment Section */}
            <div className="mt-10">
              {/* Share Buttons */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-slate-600 dark:text-slate-400 font-medium mr-2">Share:</span>
                <Link to={""} className="text-blue-600 hover:text-blue-800 transition-colors">
                  <FaFacebookF className="text-xl" />
                </Link>
                <Link to={""} className="text-slate-800 hover:text-slate-600 dark:text-slate-300 dark:hover:text-white transition-colors">
                  <FaXTwitter className="text-xl" />
                </Link>
                <Link to={""} className="text-blue-500 hover:text-blue-700 transition-colors">
                  <FaLink className="text-xl" />
                </Link>
              </div>

              <hr className="my-8 border-t border-slate-200 dark:border-slate-800" />

              {/* Like Button */}
              <div className="flex items-center gap-2 mb-8">
                <button className="flex items-center bg-blue-600 text-white text-sm font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-blue-700 transition-all duration-200">
                  ❤️ Like ({0})
                </button>
              </div>

              {/* Comment Section */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Comments
                </h3>
                <div className="space-y-4">
                  {/* Sample Comments */}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src="/images/avatar-placeholder.png"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover bg-slate-200 dark:bg-slate-700"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iOCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMzYgMzZDMzYgMjggMjggMjIgMjAgMjJTNCAyOCA0IDM2IiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        John Doe
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        Great article! Very informative and well-written. Thank you for sharing this valuable information.
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        2 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src="/images/avatar-placeholder.png"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover bg-slate-200 dark:bg-slate-700"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iOCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMzYgMzZDMzYgMjggMjggMjIgMjAgMjJTNCAyOCA0IDM2IiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Sarah Wilson
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        I completely agree with the points made in this article. This has been very helpful for my understanding.
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        5 hours ago
                      </p>
                    </div>
                  </div>

                  {/* Add Comment Form */}
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      Add a comment
                    </h4>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">You</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <textarea
                          className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          rows={3}
                          placeholder="Write your comment here..."
                        />
                        <div className="flex justify-end mt-2">
                          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
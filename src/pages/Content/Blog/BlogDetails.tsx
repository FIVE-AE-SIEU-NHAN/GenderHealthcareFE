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

  // Share functionality
  const currentUrl = window.location.href;
  const shareTitle = blog?.title || 'Care4Gender Article';
  const shareText = `Check out this article: ${shareTitle}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    }
  };

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

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Share this article:</span>
                
                {/* Facebook Share */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  title="Share on Facebook"
                >
                  <FaFacebookF className="text-xl" />
                  <span className="text-sm font-medium">Facebook</span>
                </a>

                {/* Twitter/X Share */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-800 hover:text-slate-600 dark:text-slate-300 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Share on Twitter/X"
                >
                  <FaXTwitter className="text-xl" />
                  <span className="text-sm font-medium">Twitter</span>
                </a>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  title="Copy link"
                >
                  <FaLink className="text-xl" />
                </Link>
              </div>

              <hr className="my-8 border-t border-slate-200 dark:border-slate-800" />

              {/* Like Button */}
              <div className="flex items-center gap-2 mb-8">
                <button className="flex items-center bg-blue-600 text-white text-sm font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-blue-700 transition-all duration-200">
                  ❤️ Like ({blog.like_count || 0})
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
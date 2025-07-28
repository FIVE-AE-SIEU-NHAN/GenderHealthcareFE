import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaFacebookF, FaLink } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { format } from 'date-fns'

// 1. Import hook useBlogDetail
import { useBlogDetail } from '@/hooks/customer/useBlogs'

// Static data for Recent Blogs
const mockRecentBlogs = [
  { id: 2, title: 'Why you should practice morning yoga?', authorName: 'Anna Nguyen' },
  { id: 3, title: 'Clean eating menu for the new week', authorName: 'Chef Long' },
  { id: 4, title: '10 minutes of meditation to reduce stress', authorName: 'Minh Zen' },
  { id: 5, title: 'Sleep better with healthy habits', authorName: 'Dr. Tam An' }
]

const BlogDetails: React.FC = () => {
  // 2. Get `id` from URL parameters
  const { id } = useParams<{ id: string }>()

  // 3. Call useBlogDetail hook to fetch data, loading state and error
  const { data: blog, isLoading, isError, error } = useBlogDetail(id)

  // Share functionality
  const currentUrl = window.location.href
  const shareTitle = blog?.title || 'Care4Gender Article'
  const shareText = `Check out this article: ${shareTitle}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy link:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = currentUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Link copied to clipboard!')
    }
  }

  // 4. Handle Loading state: Show loading message while waiting for API
  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900'>
        <div className='text-xl font-semibold text-slate-800 dark:text-slate-200'>Loading article...</div>
      </div>
    )
  }

  // 5. Handle Error state: Show error message if API fails
  if (isError) {
    return (
      <div className='flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900'>
        <div className='text-xl font-semibold text-red-500'>
          Error: Unable to load article data.
          <p className='mt-2 text-sm text-slate-600 dark:text-slate-400'>{error?.message}</p>
        </div>
      </div>
    )
  }

  // 6. Handle case when article is not found after loading
  if (!blog) {
    return (
      <div className='flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900'>
        <div className='text-xl font-semibold text-slate-800 dark:text-slate-200'>Article not found.</div>
      </div>
    )
  }

  // 7. Render interface with real data from API
  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-900'>
      <div className='mx-auto max-w-7xl px-4 py-8'>
        {/* Cover Image */}
        <div className='mb-12 h-[400px] w-full'>
          <img
            src={blog.main_image || '/images/cover.jpg'}
            alt={blog.title}
            className='h-full w-full rounded-xl bg-slate-200 object-cover shadow-lg dark:bg-slate-800'
            onError={(e) => {
              e.currentTarget.src = '/images/cover.jpg'
            }}
          />
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-12 md:grid-cols-4'>
          {/* Sidebar - Recent Blogs */}
          <aside className='h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-xl/20 md:col-span-1 dark:border-slate-800 dark:bg-slate-950'>
            <h4 className='mb-4 text-xl font-bold text-slate-900 dark:text-slate-100'>Recent Articles</h4>
            <ul className='space-y-5'>
              {mockRecentBlogs.map((b) => (
                <li key={b.id}>
                  <Link to={`/blog/${b.id}`} className='group block'>
                    <p className='font-semibold text-blue-600 group-hover:underline dark:text-blue-400'>{b.title}</p>
                    <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>{b.authorName}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Article Content */}
          <article className='rounded-xl border border-slate-200 bg-white p-8 shadow-xl/20 md:col-span-3 dark:border-slate-800 dark:bg-slate-950'>
            {/* Article Header */}
            <div className='mb-10'>
              <h1 className='mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
                {blog.title}
              </h1>
              <p className='text-sm text-slate-500 dark:text-slate-400'>
                By {blog.author_name} |{' '}
                <time dateTime={blog.created_at}>{format(new Date(blog.created_at), "MMMM dd, yyyy 'at' HH:mm")}</time>
              </p>
            </div>

            {/* Article Content */}
            <div className='space-y-10 text-slate-800 dark:text-slate-200'>
              {/* Summary */}
              {blog.summary && (
                <blockquote className='border-l-4 border-blue-500 pl-6 text-lg/relaxed text-slate-700 italic dark:text-slate-300'>
                  {blog.summary}
                </blockquote>
              )}

              {/* Main Content */}
              {blog.content && (
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100'>Article Content</h2>
                  <p className='text-base/relaxed whitespace-pre-line'>{blog.content}</p>
                </section>
              )}

              {/* Section 1 */}
              {blog.section_1 && (
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100'>Main Points</h2>
                  <p className='text-base/relaxed whitespace-pre-line'>{blog.section_1}</p>
                </section>
              )}

              {/* Sub Image */}
              {blog.sub_image && (
                <div className='my-8'>
                  <img
                    src={blog.sub_image}
                    alt='Sub-image'
                    className='w-full rounded-xl bg-slate-200 shadow-md dark:bg-slate-800'
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-image.svg'
                    }}
                  />
                </div>
              )}

              {/* Section 2 */}
              {blog.section_2 && (
                <section>
                  <h2 className='mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100'>Additional Information</h2>
                  <p className='text-base/relaxed whitespace-pre-line'>{blog.section_2}</p>
                </section>
              )}
            </div>

            {/* Share Section */}
            <div className='mt-12 border-t border-slate-200 pt-8 dark:border-slate-800'>
              <div className='flex items-center gap-4'>
                <span className='font-medium text-slate-600 dark:text-slate-400'>Share this article:</span>

                {/* Facebook Share */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-900/20'
                  title='Share on Facebook'
                >
                  <FaFacebookF className='text-xl' />
                  <span className='text-sm font-medium'>Facebook</span>
                </a>

                {/* Twitter/X Share */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 rounded-lg p-2 text-slate-800 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  title='Share on Twitter/X'
                >
                  <FaXTwitter className='text-xl' />
                  <span className='text-sm font-medium'>Twitter</span>
                </a>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className='flex items-center gap-2 rounded-lg p-2 text-blue-500 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20'
                  title='Copy link'
                >
                  <FaLink className='text-xl' />
                  <span className='text-sm font-medium'>Copy Link</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails

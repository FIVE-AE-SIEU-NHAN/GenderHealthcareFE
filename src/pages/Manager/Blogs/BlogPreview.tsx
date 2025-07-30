import React from 'react'
import { format } from 'date-fns'
import { FaFacebookF, FaLink } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Blog } from '@/types' // Ensure this path is correct

// A placeholder image for when a blog image is missing
const placeholderImg = '/images/placeholder-image.svg'

/**
 * Props for the BlogPreview component.
 * It accepts a partial Blog object to be flexible for both
 * the create form's live preview and the manager's detail view.
 */
interface BlogPreviewProps {
  blogData: Partial<Blog>
  authorName?: string // Optional override for the author's name
}

/**
 * A reusable component to display a formatted preview of a blog article.
 */
export const BlogPreview: React.FC<BlogPreviewProps> = ({ blogData, authorName }) => {
  const { title, summary, content, section_1, section_2, main_image, sub_image, created_at } = blogData

  // Determine the author and date to display, with fallbacks
  const displayAuthor = authorName || blogData.author_name || 'Anonymous'
  const displayDate = created_at ? new Date(created_at) : new Date()

  const mainImagePreview = main_image || placeholderImg
  const subImagePreview = sub_image || placeholderImg

  return (
    <main className='h-fit rounded-xl border border-slate-200 bg-white p-4 shadow-xl/20 lg:block dark:bg-slate-950'>
      <div className='h-full w-full overflow-y-auto'>
        {/* Main Image */}
        <div className='mb-8 h-[350px] w-full'>
          <img
            key={mainImagePreview} // Using a key helps React correctly update the image
            src={mainImagePreview}
            alt={title || 'Main Image'}
            className='h-full w-full rounded-lg bg-slate-200 object-cover dark:bg-slate-800'
            onError={(e) => {
              e.currentTarget.src = placeholderImg
            }}
          />
        </div>

        <div className='grid grid-cols-1 gap-12 px-6 pb-8 md:grid-cols-4'>
          {/* Article Content */}
          <article className='text-slate-800 md:col-span-3 dark:text-slate-200'>
            <h1 className='mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
              {title || 'Article Title'}
            </h1>
            <p className='mb-10 text-sm text-slate-500 dark:text-slate-400'>
              By {displayAuthor} | <time>{format(displayDate, 'MMMM dd, yyyy')}</time>
            </p>

            <div className='space-y-10'>
              {summary && (
                <blockquote className='border-l-4 border-blue-500 pl-6 text-lg/relaxed text-slate-700 italic dark:text-slate-300'>
                  {summary}
                </blockquote>
              )}
              {content && (
                <div>
                  <h2 className='mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100'>Article Content</h2>
                  <p className='text-base/relaxed whitespace-pre-line'>{content}</p>
                </div>
              )}
              {section_1 && (
                <div>
                  <h2 className='mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100'>Main Points</h2>
                  <p className='text-base/relaxed whitespace-pre-line'>{section_1}</p>
                </div>
              )}
              {subImagePreview && subImagePreview !== placeholderImg && (
                <div className='my-8'>
                  <img
                    key={subImagePreview}
                    src={subImagePreview}
                    alt='Sub-image'
                    className='w-full rounded-xl bg-slate-200 shadow-md dark:bg-slate-800'
                    onError={(e) => {
                      e.currentTarget.src = placeholderImg
                    }}
                  />
                </div>
              )}
              {section_2 && (
                <div>
                  <h2 className='mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100'>Additional Information</h2>
                  <p className='text-base/relaxed whitespace-pre-line'>{section_2}</p>
                </div>
              )}
            </div>

            {/* Share Links */}
            <hr className='my-12 dark:border-slate-800' />
            <div className='flex items-center gap-4'>
              <span className='font-medium text-slate-600 dark:text-slate-400'>Share:</span>
              <a href='#' className='text-slate-500 hover:text-blue-600 dark:hover:text-blue-400'>
                <FaFacebookF size={20} />
              </a>
              <a href='#' className='text-slate-500 hover:text-black dark:hover:text-white'>
                <FaXTwitter size={20} />
              </a>
              <a href='#' className='text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'>
                <FaLink size={20} />
              </a>
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}

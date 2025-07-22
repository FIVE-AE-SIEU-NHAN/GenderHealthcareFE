import { Link } from 'react-router-dom'
import { useBlogsList } from '@/hooks/customer/useBlogs'
import { Blog } from '@/types'
import { useState } from 'react'
import { Pagination } from '@/components/layouts/pagin/Pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Skeleton component cho trạng thái loading
const BlogListSkeleton = () => (
  <div className='mx-auto max-w-7xl p-5'>
    <div className='grid grid-cols-1 gap-5 md:grid-cols-4'>
      <section className='col-span-1 md:col-span-4 lg:col-span-1'>
        <div className='flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4'>
          <Skeleton className='mb-3 h-60 w-full rounded' />
          <Skeleton className='mb-3 h-8 w-3/4' />
          <Skeleton className='mb-3 h-4 w-1/2' />
          <Skeleton className='mb-1 h-4 w-full' />
          <Skeleton className='mb-1 h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
        </div>
      </section>
      <section className='col-span-1 grid grid-cols-1 gap-5 sm:grid-cols-2 md:col-span-4 md:grid-cols-3 lg:col-span-3'>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className='flex flex-col rounded-lg border border-gray-200 bg-white p-4'>
            <Skeleton className='mb-3 h-40 w-full rounded' />
            <Skeleton className='mb-2 h-6 w-full' />
            <Skeleton className='mb-2 h-4 w-1/3' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        ))}
      </section>
    </div>
  </div>
)

// Card component cho từng bài blog
const BlogCard = (blog: Blog) => (
  <Link
    to={`/blogs/${blog.id}`}
    className='col-span-1 flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg'
  >
    <img
      src={blog.cover_image}
      alt={blog.title}
      className='mb-3 h-40 w-full overflow-hidden rounded object-cover object-top'
    />
    <h3 className='mb-1 flex-grow text-lg font-semibold'>
      {blog.title.length > 50 ? blog.title.slice(0, 50) + '...' : blog.title}
    </h3>
    <p className='mb-2 flex-grow text-sm text-gray-600'>
      {blog.summary && blog.summary.length > 200 ? blog.summary.slice(0, 200) + '...' : blog.summary}
    </p>
    <div className='mt-auto flex flex-col pt-2 text-sm text-gray-500'>
      <div className='font-medium text-gray-700'>{blog.author_name}</div>
      <time dateTime={blog.created_at}>{new Date(blog.created_at).toLocaleDateString('vi-VN')}</time>
    </div>
  </Link>
)

const BlogPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<{ field: 'created_at'; direction: 'asc' | 'desc' }>({
    field: 'created_at',
    direction: 'desc'
  })

  // State cho tìm kiếm
  const [searchInput, setSearchInput] = useState('')
  const [committedSearchTerm, setCommittedSearchTerm] = useState('')
  const LIMIT = 10

  // Hook lấy danh sách blogllll
  const {
    data: blogData,
    isLoading,
    isError,
    error,
    isFetching
  } = useBlogsList({
    page,
    limit: LIMIT,
    sort,
    search: { field: 'title', value: committedSearchTerm }
  })

  // Xử lý tìm kiếm
  const handleSearch = () => {
    setCommittedSearchTerm(searchInput)
    setPage(1)
  }

  // Loading state
  if (isLoading) {
    return (
      <>
        <section className="relative flex h-[150px] flex-col items-center justify-center bg-[url('@/assets/images/blog1.webp')] bg-cover bg-center py-12 text-center">
          <h2 className='text-5xl font-bold text-white'>Our Blogs</h2>
          <p className='mt-2 text-sm'>
            <span className='text-white'>Home</span>
            <span style={{ color: '#55AEFF' }}> / Blog List</span>
          </p>
        </section>
        <BlogListSkeleton />
      </>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className='mx-auto max-w-7xl p-5 text-center text-red-600'>
        <h3 className='text-2xl font-bold'>An error occurred.</h3>
        <p>{error.message}</p>
      </div>
    )
  }

  // Dữ liệu thành công
  const blogs = blogData?.data ?? []
  const totalBlogs = blogData?.total ?? 0
  const totalPages = Math.ceil(totalBlogs / LIMIT)
  const otherBlogs = blogs.slice(1)

  return (
    <div className='font-inter bg-gray-100 text-gray-800'>
      {/* Banner */}
      <section className="relative flex h-[150px] flex-col items-center justify-center bg-[url('@/assets/images/blog1.webp')] bg-cover bg-center py-12 text-center">
        <h2 className='text-5xl font-bold text-white'>Our Blogs</h2>
        <p className='mt-2 text-sm'>
          <span className='text-white'>Home</span>
          <span style={{ color: '#55AEFF' }}> / Blog List</span>
        </p>
      </section>

      {/* Khu vực Sort & Search */}
      <div className='mx-auto max-w-7xl p-5'>
        <div className='flex items-center justify-end gap-2'>
          <Button
            variant={sort.direction === 'desc' ? 'default' : 'outline'}
            onClick={() => {
              setSort({ field: 'created_at', direction: 'desc' })
              setPage(1)
            }}
          >
            Latest
          </Button>
          <Button
            variant={sort.direction === 'asc' ? 'default' : 'outline'}
            onClick={() => {
              setSort({ field: 'created_at', direction: 'asc' })
              setPage(1)
            }}
          >
            Oldest
          </Button>
          <div className='relative flex flex-1 items-center gap-2 md:flex-none'>
            <Input
              type='text'
              placeholder='Search by title...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch()
              }}
              className='h-11 w-full md:w-64'
            />
            <Button onClick={handleSearch} aria-label='Tìm kiếm'>
              <Search className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
        {blogs.length > 0 ? (
          <section className='mx-auto max-w-7xl p-5 pt-0'>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
              <section className='col-span-1 grid grid-cols-1 gap-5 sm:grid-cols-2 md:col-span-4 md:grid-cols-3 lg:col-span-3'>
                {otherBlogs.map((blog) => (
                  <BlogCard key={blog.id} {...blog} />
                ))}
              </section>
            </div>
          </section>
        ) : (
          <div className='py-20 text-center'>
            <h3 className='text-2xl font-semibold'>No posts found!</h3>
            <p className='mt-2 text-gray-500'>
              {committedSearchTerm ? `No results for keyword "${committedSearchTerm}".` : 'Please try again later.'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-center pb-10'>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          showJump={false}
          className='flex w-full items-center justify-center px-16'
        />
      </div>
    </div>
  )
}

export default BlogPage

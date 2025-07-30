import React from 'react'
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { ScanEye, XCircle } from 'lucide-react'
import { useBlogDetail } from '@/hooks/customer/useBlogs'
import { BlogPreview } from './BlogPreview'

interface BlogManagerViewProps {
  blogId: string | null
}

const BlogPreviewSkeleton = () => (
  <div className='p-4'>
    <Skeleton className='mb-8 h-[350px] w-full rounded-lg' />
    <div className='px-6 pb-8'>
      <Skeleton className='mb-4 h-10 w-3/4' />
      <Skeleton className='mb-10 h-5 w-1/2' />
      <div className='space-y-8'>
        <Skeleton className='h-20 w-full' />
        <Skeleton className='h-40 w-full' />
        <Skeleton className='h-40 w-full' />
      </div>
    </div>
  </div>
)

export const BlogManagerView: React.FC<BlogManagerViewProps> = ({ blogId }) => {
  const { data: blog, isLoading, isError, error, isFetching } = useBlogDetail(blogId)

  return (
    <>
      <DialogHeader className='rounded-t-lg border-b bg-gradient-to-br from-slate-50 to-slate-100 p-6 pb-4'>
        <div className='flex items-center gap-4'>
          <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600'>
            <ScanEye className='h-8 w-8 text-white' />
          </div>
          <div className='flex flex-col'>
            <DialogTitle className='text-foreground text-3xl font-bold tracking-tight'>Blog Details</DialogTitle>
            <DialogDescription className='text-muted-foreground mt-1 text-base'>
              {isLoading ? 'Loading blog content...' : `Viewing details for Blog ID: ${blogId}`}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className='mt-4 max-h-[calc(80vh-4rem)] overflow-y-auto pr-2'>
        {isLoading || isFetching ? (
          <BlogPreviewSkeleton />
        ) : isError ? (
          <div className='flex flex-col items-center justify-center rounded-lg border bg-red-50 p-10 text-center'>
            <div className='rounded-full bg-red-100 p-3'>
              <XCircle className='h-8 w-8 text-red-500' />
            </div>
            <h3 className='mt-4 text-lg font-semibold text-red-800'>Failed to Load Blog</h3>
            <p className='mt-1 text-red-600'>{error?.message || 'An unknown error occurred.'}</p>
          </div>
        ) : blog ? (
          <BlogPreview blogData={blog} />
        ) : (
          <div className='p-10 text-center'>No blog data available.</div>
        )}
      </div>
    </>
  )
}

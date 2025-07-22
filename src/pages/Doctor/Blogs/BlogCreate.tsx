import React, { useEffect } from 'react'
import { format } from 'date-fns'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaFacebookF, FaLink } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Loader2, Image as ImageIcon, Info, FileText } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { CreateBlogPayload, UpdateBlogPayload } from '@/types/customer/blogTypes' // Ensure path is correct
import { useBlogMutations } from '@/hooks/doctor/useBlogsMutations'
import { Blog } from '@/types'

const blogSchema = z.object({
  title: z.string().min(1, 'Article Title is required.'),
  summary: z.string().min(1, 'Summary is required.').max(100, 'Summary must be 100 characters or less.'),
  content: z.string().min(1, 'Main Content is required.').max(1000, 'Main Content must be 1000 characters or less.'),
  section_1: z.string().max(500, 'Section 1 must be 500 characters or less.').optional(),
  section_2: z.string().max(500, 'Section 2 must be 500 characters or less.').optional(),
  cover_image: z.string().min(1, 'Cover Image URL is required.').url({ message: 'Please enter a valid URL.' }),
  main_image: z.string().min(1, 'Main Image URL is required.').url({ message: 'Please enter a valid URL.' }),
  sub_image: z.string().min(1, 'Sub-image URL is required.').url({ message: 'Please enter a valid URL.' })
})

type BlogFormData = z.infer<typeof blogSchema>

const mockRecentBlogs = [
  { id: 2, title: 'Why you should practice morning yoga', authorName: 'Anna Doe' },
  { id: 3, title: 'Clean eating menu for the new week', authorName: 'Chef Long' },
  { id: 4, title: '10 minutes of meditation to reduce stress', authorName: 'Mina Zen' }
]

// Props interface for communication with the parent dialog
interface CreateBlogDialogContentProps {
  initialData?: Blog | null
  onSuccess: () => void
  onCancel: () => void
  onSubmittingChange: (isSubmitting: boolean) => void
}

/**
 * Renders the content for the blog creation dialog, including the form
 * on the left and a live preview on the right.
 */
export const CreateBlogDialogContent: React.FC<CreateBlogDialogContentProps> = ({
  initialData,
  onSuccess,
  onCancel,
  onSubmittingChange
}) => {
  const { createBlog, updateBlog } = useBlogMutations()

  const isUpdateMode = !!initialData
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    mode: 'onBlur',
    // Use initialData for default values if in update mode
    defaultValues: {
      title: initialData?.title || '',
      summary: initialData?.summary || '',
      content: initialData?.content || '',
      section_1: initialData?.section_1 || '',
      section_2: initialData?.section_2 || '',
      cover_image: initialData?.cover_image || '',
      main_image: initialData?.main_image || '',
      sub_image: initialData?.sub_image || ''
    }
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    } else {
      reset({
        title: '',
        summary: '',
        content: '',
        section_1: '',
        section_2: '',
        cover_image: '',
        main_image: '',
        sub_image: ''
      })
    }
  }, [initialData, reset])

  const isSubmitting = createBlog.isPending || updateBlog.isPending

  const watchedValues = watch()
  const placeholderImg = '/images/placeholder-image.svg'
  const coverImagePreview = watchedValues.cover_image || placeholderImg
  const subImagePreview = watchedValues.sub_image || placeholderImg
  const currentDate = new Date()

  useEffect(() => {
    onSubmittingChange(isSubmitting)
  }, [isSubmitting, onSubmittingChange])

  const onSubmit = (data: BlogFormData) => {
    if (isUpdateMode && initialData) {
      // ===== UPDATE =====
      updateBlog.mutate(
        { blogId: initialData.id, payload: data as UpdateBlogPayload },
        { onSuccess: () => onSuccess() }
      )
    } else {
      // ===== CREATE =====
      createBlog.mutate(data as CreateBlogPayload, {
        onSuccess: () => onSuccess()
      })
    }
  }

  return (
    <div className='grid w-full grid-cols-1 gap-6 lg:grid-cols-2'>
      {/* ===== Left Column: The Form ===== */}
      <aside className='rounded-xl border border-slate-200 bg-white p-6 shadow-xl/20 lg:col-span-1 lg:p-8 dark:bg-slate-950'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-4'>
            <h3 className='flex items-center gap-3 text-xl font-medium text-slate-800 dark:text-slate-200'>
              <Info className='h-6 w-6 text-slate-400' /> Primary Information
            </h3>
            <div className='space-y-4 rounded-lg border bg-slate-50 p-6 dark:bg-slate-900'>
              <div className='space-y-2'>
                <Label htmlFor='title' className='text-base'>
                  Article Title
                </Label>
                <Input id='title' {...register('title')} disabled={isSubmitting} />
                {errors.title && <p className='mt-1 text-sm text-red-500'>{errors.title.message}</p>}
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <h3 className='flex items-center gap-3 text-xl font-medium text-slate-800 dark:text-slate-200'>
              <FileText className='h-6 w-6 text-slate-400' /> Content Sections
            </h3>
            <div className='space-y-6 rounded-lg border bg-slate-50 p-6 dark:bg-slate-900'>
              <div className='space-y-2'>
                <Label htmlFor='summary' className='text-base'>
                  Summary
                </Label>
                <Textarea id='summary' {...register('summary')} className='h-24' disabled={isSubmitting} />
                <div className='flex items-center justify-between'>
                  {errors.summary ? <p className='text-sm text-red-500'>{errors.summary.message}</p> : <div />}
                  <p
                    className={cn(
                      'ml-auto text-sm text-slate-500',
                      (watchedValues.summary?.length || 0) > 100 && 'font-bold text-red-500'
                    )}
                  >
                    {watchedValues.summary?.length || 0} / 100
                  </p>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='content' className='text-base'>
                  Main Content
                </Label>
                <Textarea id='content' {...register('content')} className='h-40' disabled={isSubmitting} />
                <div className='flex items-center justify-between'>
                  {errors.content ? <p className='text-sm text-red-500'>{errors.content.message}</p> : <div />}
                  <p
                    className={cn(
                      'ml-auto text-sm text-slate-500',
                      (watchedValues.content?.length || 0) > 1000 && 'font-bold text-red-500'
                    )}
                  >
                    {watchedValues.content?.length || 0} / 1000
                  </p>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='section1' className='text-base'>
                  Section 1
                </Label>
                <Textarea id='section1' {...register('section_1')} className='h-32' disabled={isSubmitting} />
                <div className='flex items-center justify-between'>
                  {errors.section_1 ? <p className='text-sm text-red-500'>{errors.section_1.message}</p> : <div />}
                  <p
                    className={cn(
                      'ml-auto text-sm text-slate-500',
                      (watchedValues.section_1?.length || 0) > 500 && 'font-bold text-red-500'
                    )}
                  >
                    {watchedValues.section_1?.length || 0} / 500
                  </p>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='section2' className='text-base'>
                  Section 2
                </Label>
                <Textarea id='section2' {...register('section_2')} className='h-32' disabled={isSubmitting} />
                <div className='flex items-center justify-between'>
                  {errors.section_2 ? <p className='text-sm text-red-500'>{errors.section_2.message}</p> : <div />}
                  <p
                    className={cn(
                      'ml-auto text-sm text-slate-500',
                      (watchedValues.section_2?.length || 0) > 500 && 'font-bold text-red-500'
                    )}
                  >
                    {watchedValues.section_2?.length || 0} / 500
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <h3 className='flex items-center gap-3 text-xl font-medium text-slate-800 dark:text-slate-200'>
              <ImageIcon className='h-6 w-6 text-slate-400' /> Article Images
            </h3>
            <div className='space-y-4 rounded-lg border bg-slate-50 p-6 dark:bg-slate-900'>
              <div className='space-y-2'>
                <Label htmlFor='coverImage' className='text-base'>
                  Main Image URL (in-article)
                </Label>
                <Input id='coverImage' {...register('cover_image')} disabled={createBlog.isPending} />
                {errors.cover_image && <p className='mt-1 text-sm text-red-500'>{errors.cover_image.message}</p>}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='subImage' className='text-base'>
                  Sub-image URL (in-article)
                </Label>
                <Input id='subImage' {...register('sub_image')} disabled={createBlog.isPending} />
                {errors.sub_image && <p className='mt-1 text-sm text-red-500'>{errors.sub_image.message}</p>}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='mainImage' className='text-base'>
                  Cover Image URL (for list page)
                </Label>
                <Input id='mainImage' {...register('main_image')} disabled={createBlog.isPending} />
                {errors.main_image && <p className='mt-1 text-sm text-red-500'>{errors.main_image.message}</p>}
              </div>
            </div>
          </div>

          <div className='flex justify-end gap-4 border-t pt-6 dark:border-slate-800'>
            <Button type='button' variant='ghost' onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting} className='min-w-[120px]'>
              {createBlog.isPending ? <Loader2 className='animate-spin' /> : 'Save Article'}
            </Button>
          </div>
        </form>
      </aside>

      {/* ===== Right Column: Live Preview ===== */}
      <main className='hidden h-fit rounded-xl border border-slate-200 bg-white p-4 shadow-xl/20 lg:col-span-1 lg:block dark:bg-slate-950'>
        <div className='h-full w-full overflow-y-auto'>
          <div className='mb-8 h-[350px] w-full'>
            <img
              src={coverImagePreview}
              alt={watchedValues.title || 'Cover Image'}
              className='h-full w-full rounded-lg bg-slate-200 object-cover dark:bg-slate-800'
              onError={(e) => {
                e.currentTarget.src = placeholderImg
              }}
            />
          </div>
          <div className='grid grid-cols-1 gap-12 px-6 pb-8 md:grid-cols-4'>
            <aside className='h-fit md:col-span-1'>
              <h4 className='mb-4 font-bold text-slate-900 dark:text-slate-100'>Recent Articles</h4>
              <ul className='space-y-5'>
                {mockRecentBlogs.map((b) => (
                  <li key={b.id}>
                    <a href='#' className='group block'>
                      <p className='font-semibold text-blue-600 group-hover:underline dark:text-blue-400'>{b.title}</p>
                      <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>{b.authorName}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
            <article className='text-slate-800 md:col-span-3 dark:text-slate-200'>
              <h1 className='mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
                {watchedValues.title || 'Article Title'}
              </h1>
              <p className='mb-10 text-sm text-slate-500 dark:text-slate-400'>
                By You | <time>{format(currentDate, 'MMMM dd, yyyy')}</time>
              </p>
              <div className='space-y-10'>
                {watchedValues.summary && (
                  <blockquote className='border-l-4 border-blue-500 pl-6 text-lg/relaxed text-slate-700 italic dark:text-slate-300'>
                    {watchedValues.summary}
                  </blockquote>
                )}
                {watchedValues.content && (
                  <div>
                    <h2 className='mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100'>Article Content</h2>
                    <p className='text-base/relaxed whitespace-pre-line'>{watchedValues.content}</p>
                  </div>
                )}
                {watchedValues.section_1 && (
                  <div>
                    <h2 className='mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100'>Main Points</h2>
                    <p className='text-base/relaxed whitespace-pre-line'>{watchedValues.section_1}</p>
                  </div>
                )}
                {subImagePreview && (
                  <div className='my-8'>
                    <img
                      src={subImagePreview}
                      alt='Sub-image'
                      className='w-full rounded-xl bg-slate-200 shadow-md dark:bg-slate-800'
                      onError={(e) => {
                        e.currentTarget.src = placeholderImg
                      }}
                    />
                  </div>
                )}
                {watchedValues.section_2 && (
                  <div>
                    <h2 className='mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100'>
                      Additional Information
                    </h2>
                    <p className='text-base/relaxed whitespace-pre-line'>{watchedValues.section_2}</p>
                  </div>
                )}
              </div>
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
    </div>
  )
}

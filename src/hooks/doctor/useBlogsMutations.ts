import { createBlogAPI, updateBlogAPI } from '@/apis/doctor/blogsApi'
import {
  CreateBlogPayload,
  CreateBlogResponse,
  UpdateBlogPayload,
  UpdateBlogResponse
} from '@/types/customer/blogTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * A hook for blog creation.
 */
export const useBlogMutations = () => {
  const queryClient = useQueryClient()
  // =============== BLOG CREATION ===============
  const createBlogMutation = useMutation<CreateBlogResponse, Error, CreateBlogPayload>({
    mutationFn: createBlogAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      toast.success(data.message || 'Blog created successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create blog.')
    }
  })

  // =============== BLOG UPDATE ===============
  const updateBlogMutation = useMutation<UpdateBlogResponse, Error, { blogId: string; payload: UpdateBlogPayload }>({
    mutationFn: updateBlogAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      toast.success(data.message || 'Blog updated successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update blog.')
    }
  })

  return {
    createBlog: createBlogMutation,
    updateBlog: updateBlogMutation
  }
}

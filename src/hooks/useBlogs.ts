import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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

const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await axios.get<Blog[]>('http://localhost:3001/blogs')
  return response.data.data
}

export const useBlogs = () => {
  return useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  })
}
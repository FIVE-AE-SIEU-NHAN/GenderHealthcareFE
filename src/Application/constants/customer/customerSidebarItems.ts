import { FileText, FileQuestion, User, MessageCircle, Flower2 } from 'lucide-react'
import type { NavMainProps } from '@/components/layouts/Dashboard/nav-main'

export const customerSidebarItems: NavMainProps['items'] = [
  {
    title: 'Your Appointments',
    url: '/user/appointments',
    icon: FileText
  },
  {
    title: 'Your Cycle',
    url: '/user/cycle-tracking',
    icon: Flower2
  },
  {
    title: 'Your Questions',
    url: '/user/questions',
    icon: FileQuestion
  },
  {
    title: 'Chat',
    url: '/user/chat',
    icon: MessageCircle
  },
  {
    title: 'Your Profile',
    url: '/user/profile',
    icon: User
  }
]

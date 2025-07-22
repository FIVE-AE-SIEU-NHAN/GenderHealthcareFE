import { CalendarCheck, NotebookPen, User } from 'lucide-react'
import type { NavMainProps } from '@/components/layouts/Dashboard/nav-main'

export const doctorSidebarItems: NavMainProps['items'] = [
  {
    title: 'Appointments',
    url: '/doctor/appointments',
    icon: CalendarCheck
  },
  {
    title: 'Blogs',
    url: '/doctor/blogs',
    icon: NotebookPen
  },
  {
    title: 'Your Profile',
    url: '/doctor/profile',
    icon: User
  }
]

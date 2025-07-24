import { CalendarCheck, FileText, NotebookPen, ShieldUser, Stethoscope, Syringe } from 'lucide-react'
import type { NavMainProps } from '@/components/layouts/Dashboard/nav-main'

export const managerSidebarItems: NavMainProps['items'] = [
  {
    title: 'Questions',
    url: '/manager/questions',
    icon: FileText
  },
  {
    title: 'Consultants',
    url: '/manager/consultants',
    icon: ShieldUser
  },
  {
    title: 'Doctors',
    url: '/manager/doctors',
    icon: Syringe
  },
  {
    title: 'Consultations',
    url: '/manager/consultation-appointments',
    icon: CalendarCheck
  },
  {
    title: 'Service Bookings',
    url: '/manager/service-appointments',
    icon: Stethoscope
  },
  {
    title: 'Blogs',
    url: '/manager/blogs',
    icon: NotebookPen
  }
  // {
  //   title: "Your Profile",
  //   url: "/dashboard/profile",
  //   icon: User,
  // },
]

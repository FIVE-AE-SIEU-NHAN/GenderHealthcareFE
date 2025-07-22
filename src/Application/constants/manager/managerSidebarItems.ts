import { CalendarCheck, FileText, NotebookPen, ShieldUser, Syringe } from 'lucide-react'
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
    title: 'Appointments',
    url: '/manager/appointments',
    icon: CalendarCheck
  },
  {
    title: 'Blogs',
    url: '/manager/blogs',
    icon: NotebookPen
  }
  // {
  //   title: "Consultant Management",
  //   url: "/manager/consultants",
  //   icon: Users,
  // },

  // {
  //   title: "Báo Cáo Thống Kê",
  //   url: "/dashboard/reports",
  //   icon: BarChart2,
  // },
  // {
  //   title: "Cấu Hình Tham Số",
  //   url: "/dashboard/settings",
  //   icon: Settings,
  // },
  // {
  //   title: "Your Profile",
  //   url: "/dashboard/profile",
  //   icon: User,
  // },
]

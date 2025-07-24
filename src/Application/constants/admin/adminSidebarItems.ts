import { Users } from 'lucide-react'
import type { NavMainProps } from '@/components/layouts/Dashboard/nav-main'
import { BsRobot } from 'react-icons/bs'
import { wrapReactIcon } from '@/utils/reactIconsWrapper'
import { RiRobot3Line } from 'react-icons/ri'

export const adminSidebarItems: NavMainProps['items'] = [
  {
    title: 'User Management',
    url: '/dashboard/users',
    icon: Users
  },
  {
    title: 'AI Assistant',
    url: '/dashboard/assistant',
    icon: wrapReactIcon(BsRobot)
  },
  {
    title: 'Menstrual Predictor AI',
    url: '/dashboard/menstrual-predictor',
    icon: wrapReactIcon(RiRobot3Line)
  }
  // {
  //   title: 'Báo Cáo Thống Kê',
  //   url: '/dashboard/reports',
  //   icon: BarChart2
  // },
  // {
  //   title: 'Cấu Hình Tham Số',
  //   url: '/dashboard/settings',
  //   icon: Settings
  // }
]

import { BarChart2, CalendarCheck, ClipboardList, FileText, Settings, User, Users } from "lucide-react"
import type { NavMainProps } from "@/components/layouts/Dashboard/nav-main"

export const adminSidebarItems: NavMainProps["items"] = [
  {
    title: "Blog Management",
    url: "/dashboard/blogs",
    icon: FileText, 
  },
  {
    title: "User Management",
    url: "/dashboard/users",
    icon: Users, 
  },
  {
    title: "Services Management",
    url: "/dashboard/services",
    icon: ClipboardList, 
  },
  {
    title: "Appointments Management",
    url: "/admin/appointments",
    icon: CalendarCheck, 
  },
  {
    title: "Báo Cáo Thống Kê",
    url: "/dashboard/reports",
    icon: BarChart2, 
  },
  {
    title: "Cấu Hình Tham Số",
    url: "/dashboard/settings",
    icon: Settings, 
  },
  {
    title: "Your Profile",
    url: "/dashboard/profile",
    icon: User, 
  },
]


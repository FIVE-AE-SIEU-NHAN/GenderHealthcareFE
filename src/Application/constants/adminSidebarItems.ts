import { BarChart2, CalendarCheck, ClipboardList, FileText, Settings, User, Users } from "lucide-react"
import type { NavMainProps } from "@/components/nav-main"

export const adminSidebarItems: NavMainProps["items"] = [
  {
    title: "Blog Management",
    url: "/admin/dashboard/blog/list",
    icon: FileText, 
  },
  {
    title: "Users Management",
    url: "/admin/users",
    icon: Users, 
  },
  {
    title: "Services Management",
    url: "/admin/services",
    icon: ClipboardList, 
  },
  {
    title: "Appointments Management",
    url: "/admin/appointments",
    icon: CalendarCheck, 
  },
  {
    title: "Báo Cáo Thống Kê",
    url: "/admin/reports",
    icon: BarChart2, 
  },
  {
    title: "Cấu Hình Tham Số",
    url: "/admin/settings",
    icon: Settings, 
  },
  {
    title: "Your Profile",
    url: "/admin/profile",
    icon: User, 
  },
]


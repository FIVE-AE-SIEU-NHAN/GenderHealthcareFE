import { BarChart2, CalendarCheck, ClipboardList, Settings, User, Users } from "lucide-react"
import type { NavMainProps } from "@/components/nav-main"

export const adminSidebarItems: NavMainProps["items"] = [
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


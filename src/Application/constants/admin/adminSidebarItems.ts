import { BarChart2, Settings, Users } from "lucide-react"
import type { NavMainProps } from "@/components/layouts/Dashboard/nav-main"

export const adminSidebarItems: NavMainProps["items"] = [
  {
    title: "User Management",
    url: "/dashboard/users",
    icon: Users, 
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
]


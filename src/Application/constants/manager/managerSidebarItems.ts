import { FileText } from "lucide-react"
import type { NavMainProps } from "@/components/nav-main"

export const managerSidebarItems: NavMainProps["items"] = [
  {
    title: "Questions Management",
    url: "/manager/questions",
    icon: FileText, 
  },
  // {
  //   title: "Consultant Management",
  //   url: "/manager/consultants",
  //   icon: Users, 
  // },
  // {
  //   title: "Services Management",
  //   url: "/dashboard/services",
  //   icon: ClipboardList, 
  // },
  // {
  //   title: "Appointments Management",
  //   url: "/admin/appointments",
  //   icon: CalendarCheck, 
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


import { CalendarCheck, FileText, MessageCircle, User } from "lucide-react"
import type { NavMainProps } from "@/components/nav-main"

export const consultantSidebarItems: NavMainProps["items"] = [
  {
    title: "Questions",
    url: "/consultant/questions",
    icon: FileText, 
  },
  {
    title: "Chat",
    url: "/consultant/chat",
    icon: MessageCircle, 
  },
  {
    title: "Your Profile",
    url: "/consultant/profile",
    icon: User, 
  },
  {
    title: "Appointments",
    url: "/consultant/appointments",
    icon: CalendarCheck, 
  },
  // {
  //   title: "Báo Cáo Thống Kê",
  //   url: "/consultant/reports",
  //   icon: BarChart2, 
  // },
  // {
  //   title: "Cấu Hình Tham Số",
  //   url: "/consultant/settings",
  //   icon: Settings, 
  // },
  // {
  //   title: "Your Profile",
  //   url: "/consultant/profile",
  //   icon: User, 
  // },
]


import { BarChart2, CalendarCheck, ClipboardList, FileText, Settings, User, Users } from "lucide-react"
import type { NavMainProps } from "@/components/nav-main"

export const consultantSidebarItems: NavMainProps["items"] = [
  {
    title: "Questions Management",
    url: "/consultant/questions",
    icon: FileText, 
  },
  {
    title: "Consultant Management",
    url: "/consultant/consultants",
    icon: Users, 
  },
  {
    title: "Services Management",
    url: "/consultant/services",
    icon: ClipboardList, 
  },
  {
    title: "Appointments Management",
    url: "/consultant/appointments",
    icon: CalendarCheck, 
  },
  {
    title: "Báo Cáo Thống Kê",
    url: "/consultant/reports",
    icon: BarChart2, 
  },
  {
    title: "Cấu Hình Tham Số",
    url: "/consultant/settings",
    icon: Settings, 
  },
  {
    title: "Your Profile",
    url: "/consultant/profile",
    icon: User, 
  },
]


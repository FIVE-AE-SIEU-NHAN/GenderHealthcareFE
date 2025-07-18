import { CalendarCheck, FileText, MessageCircle, User } from "lucide-react"
import type { NavMainProps } from "@/components/layouts/Dashboard/nav-main"

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
    title: "Appointments",
    url: "/consultant/appointments",
    icon: CalendarCheck, 
  },
  {
    title: "Your Profile",
    url: "/consultant/profile",
    icon: User, 
  }
]


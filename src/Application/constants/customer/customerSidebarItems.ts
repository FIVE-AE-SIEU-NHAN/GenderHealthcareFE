import { FileText, FileQuestion, User, MessageCircle } from "lucide-react"
import type { NavMainProps } from "@/components/nav-main"

export const customerSidebarItems: NavMainProps["items"] = [
  {
    title: "Your Appointments",
    url: "/user/appointments",
    icon: FileText, 
  },
  {
    title: "Your Questions",
    url: "/user/questions",
    icon: FileQuestion, 
  },
  {
    title: "Chat",
    url: "/user/chat",
    icon: MessageCircle, 
  },
  {
    title: "Your Profile",
    url: "/user/profile",
    icon: User, 
  },
]

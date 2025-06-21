import { FileText, LucideIcon, User, MessageCircle } from "lucide-react"
import { RiQuestionAnswerLine } from "react-icons/ri";
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
    icon: RiQuestionAnswerLine as LucideIcon, 
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

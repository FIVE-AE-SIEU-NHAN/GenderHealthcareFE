import { FileText, Users } from "lucide-react"
import type { NavMainProps } from "@/components/nav-main"

export const customerSidebarItems: NavMainProps["items"] = [
  {
    title: "Users",
    url: "/user/dashboard/profile",
    icon: Users,
    // isActive: true,
    items: [
      {
        title: "User Profile",
        url: "/dashboard/profile/",
      },
      {
        title: "Coming Soon",
        url: "/dashboard/coming-soon",
      },
    ],
  },
  {
    title: "Appointments",
    url: "/dashboard/appointments",
    icon: FileText,
    isActive: true, 
    items: [
      {
        title: "Appointments History",
        url: "/dashboard/appointments/history",
      },
      // {
      //   title: "Create Blog",
      //   url: "/user/appointments/create",
      // },
    ],
  },
]

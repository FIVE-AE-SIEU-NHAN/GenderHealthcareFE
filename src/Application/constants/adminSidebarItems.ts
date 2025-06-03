import { FileText, Users } from "lucide-react"
import type { NavMainProps } from "@/components/nav-main"

export const adminSidebarItems: NavMainProps["items"] = [
  {
    title: "Blog",
    url: "/admin/blog",
    icon: FileText,
    isActive: true, // optional: will open this section by default
    items: [
      {
        title: "Blog List",
        url: "/admin/blog/list",
      },
      {
        title: "Create Blog",
        url: "/admin/blog/create",
      },
    ],
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    items: [
      {
        title: "User List",
        url: "/admin/users/list",
      },
      {
        title: "Create User",
        url: "/admin/users/create",
      },
    ],
  },
]

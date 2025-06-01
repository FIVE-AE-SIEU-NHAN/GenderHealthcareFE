import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  // GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import WebLogo from "@/assets/images/logo1.png"
// import avt from "@/assets/images/logo.webp"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Sample data.
const data = {
  user: {
    name: "ReDrag",
    email: "tkiet@admin.com",
    avatar: "/images/logo.webp",
  },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   }
  // ],
  navMain: [
    {
      title: "Something",
      url: "",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "/dash/blog",
        },
        {
          title: "Ipsum",
          url: "#",
        },
        {
          title: "Lorem",
          url: "#",
        },
      ],
    },
    {
      title: "Something 2",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Ipsum",
          url: "#",
        },
        {
          title: "Lorem",
          url: "#",
        },
        {
          title: "Text",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="logo-container flex">
          <img src={WebLogo} alt="logo" className="size-10 absolute left-[4px]" />
          <h1 className="truncate text-lg font-bold mt-[8px] ml-9 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-transparent bg-clip-text">
            Care4Gender
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

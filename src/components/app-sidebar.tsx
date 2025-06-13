import * as React from "react"
import {
  // BookOpen,
  // Bot,
  // Frame,
  // Map,
  // PieChart,
  // Settings2,
  // SquareTerminal,
  // LucideIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import type { NavMainProps } from "@/components/nav-main"

// Sample data.
// const data = {
//   navMain: [
//     {
//       title: "Something",
//       url: "",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "/dash/blog",
//         },
//         {
//           title: "Ipsum",
//           url: "#",
//         },
//         {
//           title: "Lorem",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Something 2",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Ipsum",
//           url: "#",
//         },
//         {
//           title: "Lorem",
//           url: "#",
//         },
//         {
//           title: "Text",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  items: NavMainProps["items"]
  // projects: {
  //   name: string
  //   url: string
  //   icon: LucideIcon
  // }[]
}

export function AppSidebar({ items, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarContent className="mt-3">
        <NavMain items={items} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
    </Sidebar>
  )
}

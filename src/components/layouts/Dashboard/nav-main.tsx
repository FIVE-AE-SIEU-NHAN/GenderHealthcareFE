"use client"

import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export interface NavMainItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export interface NavMainProps {
  items: NavMainItem[]
}

export function NavMain({ items }: NavMainProps) {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = currentPath === item.url || currentPath.startsWith(item.url + "/")

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                size="lg"
                className={cn(
                  "font-medium",
                  isActive && "pl-7 bg-dark-blue font-semibold hover:text-white hover:bg-dark-blue text-white group-data-[collapsible=icon]:bg-transparent!"
                )}
                tooltip={item.title}
              >
                <Link
                  to={item.url}
                  className= "flex items-center gap-3 whitespace-nowrap"
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        "transition-colors duration-400",
                        isActive ? "text-white group-data-[collapsible=icon]:text-semi-dark-blue! drop-shadow-md/20" : "text-slate-400"
                      )}
                    />
                  )}
                  <span className="text-[16.6px]">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

import * as React from 'react'
import {} from 'lucide-react'

import { NavMain } from '@/components/layouts/Dashboard/nav-main'
import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import type { NavMainProps } from '@/components/layouts/Dashboard/nav-main'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  items: NavMainProps['items']
}

export function AppSidebar({ items, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant='floating' collapsible='icon' {...props}>
      <SidebarContent className='mt-3'>
        <NavMain items={items} />
      </SidebarContent>
    </Sidebar>
  )
}

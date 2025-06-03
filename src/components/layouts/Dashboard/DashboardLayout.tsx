import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { NavMainProps } from "@/components/nav-main";

// 1. Define breadcrumb type and outlet context type
export interface BreadcrumbInfo {
  title: string;
  parent?: string;
  parentHref?: string;
}

export interface DashboardLayoutContext {
  setBreadcrumb: React.Dispatch<React.SetStateAction<BreadcrumbInfo>>;
}

interface DashboardLayoutProps {
  sidebarItems?: NavMainProps["items"];
}

export default function DashboardLayout({
  sidebarItems,
}: DashboardLayoutProps) {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbInfo>({
    title: "Dashboard",
  });

  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems ?? []} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumb.parent && (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink asChild>
                        <Link to={breadcrumb.parentHref || ""}>
                          {breadcrumb.parent}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet context={{ setBreadcrumb }} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

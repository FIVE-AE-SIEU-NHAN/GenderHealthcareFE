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
import { UserNav } from "@/components/layouts/Dashboard/user-nav";
import WebLogo from "@/assets/images/logo1.png"


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
  children?: React.ReactNode;
}

const AppLogo = () => (
  <Link to="/" className="flex items-center">
    <img src={WebLogo} alt="logo" className="h-12 w-12" />
    <h1 className="truncate translate-y-[1px] text-xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
      Care4Gender
    </h1>
  </Link>
);

export default function DashboardLayout({
  sidebarItems,
}: DashboardLayoutProps) {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbInfo>({
    title: "Dashboard",
  });

  return (
    <>
      <header className="mt-2 max-w-[99%] mx-auto relative flex h-15 items-center justify-between rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
        <AppLogo />
        <UserNav />
      </header>
      <div className="relative">
        <SidebarProvider className="absolute">
          <AppSidebar items={sidebarItems ?? []} className="absolute mt-1"/>
          <SidebarInset className="mt-1">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumb.parent && (
                      <>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink asChild>
                            <Link to={breadcrumb.parentHref || "#"}>
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
      </div>
    </>
  );
}

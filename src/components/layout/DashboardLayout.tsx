import React from "react";
import { Menu, Home, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", icon: <Home className="w-5 h-5" />, href: "/dashboard" },
  { label: "Profile", icon: <User className="w-5 h-5" />, href: "/dashboard/profile" },
  { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/dashboard/settings" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-blue-50 text-dark-blue">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-sm">
        <div className="h-16 flex items-center justify-center text-2xl font-bold border-b">
          DashBoard
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all",
                location.pathname === item.href && "bg-blue-100 font-semibold"
              )}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="absolute top-4 left-4 md:hidden z-50">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-white p-0">
          <div className="h-16 flex items-center justify-center text-xl font-bold border-b">
            DashBoard
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all",
                  location.pathname === item.href && "bg-blue-100 font-semibold"
                )}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Content */}
      <main className="flex-1 p-6 md:ml-64">
        {/* Top Navbar */}
        <div className="hidden md:flex items-center justify-end h-16 border-b mb-6">
          <Button variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Slot content */}
        <div>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;

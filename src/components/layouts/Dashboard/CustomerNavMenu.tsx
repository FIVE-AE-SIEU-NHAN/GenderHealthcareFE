import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Calendar, Menu } from "lucide-react";

// Helper function to scroll to the top of the page
const ToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export const CustomerNavMenu = () => {
  return (
    <>
      {/* ========================== */}
      {/* DESKTOP NAVIGATION (CENTER) */}
      {/* ========================== */}
      <div className="hidden lg:flex justify-center flex-1">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6 font-medium items-center">
            <NavigationMenuItem>
              <NavigationMenuLink className="nav-text text-xl" asChild>
                <Link
                  to="/"
                  onClick={ToTop}
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="nav-text text-xl"><Link onClick={ToTop} to="/services">Services</Link></NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="nav-text text-xl"><Link onClick={ToTop} to="/blogs">Blog</Link></NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="nav-text text-xl"><Link onClick={ToTop} to="/about-us">About</Link></NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <a
        href="/booking-info"
        className="mr-5 flex items-center gap-2 bg-gradient-to-r from-[#1c2359] via-[#1a3973] to-[#1977cc] text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-200"
      >
        <Calendar className="w-5 h-5" />
        Book an Appointment
      </a>

      {/* ===================================== */}
      {/* MOBILE NAVIGATION (HAMBURGER)         */}
      {/* ===================================== */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="p-2">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[260px] sm:w-[300px] pt-16">
            <div className="flex flex-col gap-4 items-center text-center">
              <NavigationMenu orientation="vertical">
                <NavigationMenuList className="flex flex-col gap-3 font-medium items-center">
                  <NavigationMenuItem className="w-full">
                    <Link
                      to="/"
                      onClick={ToTop}
                      className="nav-text text-xl hover:bg-gray-100 block w-full py-2 rounded-md"
                    >
                      Home
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className="nav-text text-xl hover:bg-muted-foreground/20 block w-75"><Link onClick={ToTop} to="/services">Services</Link></NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Link
                      to="/blogs"
                      onClick={ToTop}
                      className="nav-text text-xl hover:bg-gray-100 block w-full py-2 rounded-md"
                    >
                      Blog
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Link
                      to="/about-us"
                      onClick={ToTop}
                      className="nav-text text-xl hover:bg-gray-100 block w-full py-2 rounded-md"
                    >
                      About
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
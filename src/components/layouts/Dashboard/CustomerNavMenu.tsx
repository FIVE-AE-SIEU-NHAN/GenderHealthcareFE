import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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
              <NavigationMenuLink asChild className="nav-text text-xl">
                <Link to="/" onClick={ToTop}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-text text-xl">
                <Link to="/services">Services</Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white shadow-md rounded-lg p-4">
                <ul className="grid gap-3 w-[200px]">
                  <li>
                    <NavigationMenuLink
                      href="/services#gynecology"
                      className="block text-lg font-semibold rounded-md p-2 hover:bg-gray-100"
                    >
                      Gynecology
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      href="/services#cardiology"
                      className="block text-lg font-semibold rounded-md p-2 hover:bg-gray-100"
                    >
                      Cardiology
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      href="/services#neurology"
                      className="block text-lg font-semibold rounded-md p-2 hover:bg-gray-100"
                    >
                      Neurology
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      href="/services#dermatology"
                      className="block text-lg font-semibold rounded-md p-2 hover:bg-gray-100"
                    >
                      Dermatology
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="nav-text text-xl">
                <Link to="/blogs" onClick={ToTop}>
                  Blog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="nav-text text-xl">
                <Link to="/about-us" onClick={ToTop}>
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

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
                  {/* Note: ShadCN triggers don't work well inside the mobile sheet.
                      It's better to list the links directly. */}
                  <NavigationMenuItem className="w-full">
                     <Link
                      to="/services"
                      className="nav-text text-xl font-bold block w-full py-2"
                    >
                      Services
                    </Link>
                    <ul className="pl-4">
                       <li><a href="/services#gynecology" className="nav-text text-lg hover:bg-gray-100 block w-full py-1 rounded-md">Gynecology</a></li>
                       <li><a href="/services#cardiology" className="nav-text text-lg hover:bg-gray-100 block w-full py-1 rounded-md">Cardiology</a></li>
                       <li><a href="/services#neurology" className="nav-text text-lg hover:bg-gray-100 block w-full py-1 rounded-md">Neurology</a></li>
                       <li><a href="/services#dermatology" className="nav-text text-lg hover:bg-gray-100 block w-full py-1 rounded-md">Dermatology</a></li>
                    </ul>
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
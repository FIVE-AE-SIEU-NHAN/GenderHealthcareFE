import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // ✅ import Sheet
import { Menu } from "lucide-react";
import logo from "@/assets/images/logo1.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg/15 sticky top-0 z-40 shadow-b">
      <div className="mx-4 sm:mx-10 px-2 flex justify-between items-center p-1 relative">
        {/* Left side */}
        <div className="flex items-center gap-6 flex-1">
          {/* Logo */}
          <a href="/" className="text-lg flex items-center gap-1">
            <img src={logo} alt="logo" className="w-[60px]" />
            <div className="logo">
              <div className="font-extrabold text-shadow-lg text-xl">Care4Gender</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-center flex-1">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-6 font-medium items-center">
                <NavigationMenuItem>
                  <NavigationMenuLink href="#top" className="nav-text text-xl">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <a href="/services"><NavigationMenuTrigger className="nav-text text-xl">Services</NavigationMenuTrigger></a>
                  <NavigationMenuContent className="bg-white shadow-md rounded-lg p-4">
                    <ul className="grid gap-3 w-[200px]">
                      <li><NavigationMenuLink href="#gynecology" className="block text-lg font-semibold hover:bg-semi-dark-blue/8">Gynecology</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="#cardiology" className="block text-lg font-semibold hover:bg-semi-dark-blue/8">Cardiology</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="#neurology" className="block text-lg font-semibold hover:bg-semi-dark-blue/8">Neurology</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="#dermatology" className="block text-lg font-semibold hover:bg-semi-dark-blue/8">Dermatology</NavigationMenuLink></li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/blog" className="nav-text text-xl">Blog</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#about-us" className="nav-text text-xl">About</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Mobile Menu Trigger using Sheet */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger className="p-2">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px] sm:w-[300px] pt-16">
              <div className="flex flex-col gap-4 items-center text-center">
                <NavigationMenu>
                  <NavigationMenuList className="flex flex-col gap-3 font-medium items-center">
                    <NavigationMenuItem>
                      <NavigationMenuLink href="#top" className="nav-text text-xl hover:bg-muted-foreground/20 block w-75">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="#gynecology" className="nav-text text-xl hover:bg-muted-foreground/20 block w-75">Gynecology</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="#cardiology" className="nav-text text-xl hover:bg-muted-foreground/20 block w-75">Cardiology</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="#neurology" className="nav-text text-xl hover:bg-muted-foreground/20 block w-75">Neurology</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="#dermatology" className="nav-text text-xl hover:bg-muted-foreground/20 block w-75">Dermatology</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="#blog" className="nav-text text-xl hover:bg-muted-foreground/20 block w-75">Blog</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="#about-us" className="nav-text text-xl hover:bg-muted-foreground/20 block w-75">About</NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <a
                  href="/login"
                  className="bg-dark-blue text-white py-2.5 text-lg rounded-button hover:bg-blue-800 transition duration-200 font-semibold w-[50%] text-center"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="border-2 border-dark-blue text-dark-blue py-2 text-lg rounded-button hover:bg-blue-50 transition duration-200 font-semibold w-[50%] text-center"
                >
                  Sign Up
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Auth Buttons */}
        {/* <div className="hidden lg:flex gap-2 items-center">
          <a href="/login" className="bg-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-800 transition duration-200 font-semibold">Log In</a>
          <a href="/signup" className="border-2 border-dark-blue text-dark-blue px-4 py-2 rounded-button hover:bg-blue-50 transition duration-200 font-semibold">Sign Up</a>
        </div> */}
        {/* Book an Appointment Button */}
        <a
          href="/booking-form"
          className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#1c2359] via-[#1a3973] to-[#1977cc] text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-200 -translate-x-10"
        >
          <Calendar className="w-5 h-5" />
          Book an Appointment
        </a>

        {/* Notification */}
        <div className="hidden lg:flex items-center gap-4 -translate-x-4">
          <a href="/notifications" className="text-gray-600 hover:text-gray-900 transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22a2 2 0 100-4 2 2 0 000 4zm6-6V9a6 6 0 10-12 0v7l-2 2v1h16v-1l-2-2z" />
            </svg>
          </a>
        </div>


        {/* User Settings */}
        <div className="hidden lg:flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/path-to-user-image.jpg" alt="User" />
                <AvatarFallback>TK</AvatarFallback> {/* Replace JD with initials */}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 mt-2">
              <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <a href="user/dashboard/appointments/history">Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <a href="user/dashboard/appointments/history">Appointment History</a>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <a href="admin/dashboard">Admin Dashboard</a>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <a href="user/dashboard/appointments/history">Settings</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition duration-200">
                <LogOut className="w-4 h-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Calendar, Settings, LogOut } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Notification from "@/components/Notification/Notification";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const ToTop = () => window.scrollTo({ top: 0 });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg/15 sticky top-0 z-40 shadow-b">
      <div className="mx-4 sm:mx-10 px-2 flex justify-between items-center p-1 relative">
        {/* Left side */}
        <div className="flex items-center gap-6 flex-1">
          {/* Logo */}
          <Link
            to="/"
            onClick={ToTop}
            className="text-lg flex items-center gap-1"
          >
            <img src={logo} alt="logo" className="w-[60px]" />
            <div className="logo">
              <div className="font-extrabold text-shadow-lg text-xl">Care4Gender</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
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
                  <Link to="/services"><NavigationMenuTrigger className="nav-text text-xl">Services</NavigationMenuTrigger></Link>
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
                  <NavigationMenuLink asChild className="nav-text text-xl"><Link onClick={ToTop} to="/blogs">Blog</Link></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="nav-text text-xl"><Link onClick={ToTop} to="/about-us">About</Link></NavigationMenuLink>
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
                      <NavigationMenuLink className="nav-text text-xl hover:bg-muted-foreground/20 block w-75"><Link onClick={ToTop} to="/">Home</Link></NavigationMenuLink>
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

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="/booking-info"
            className="flex items-center gap-2 bg-gradient-to-r from-[#1c2359] via-[#1a3973] to-[#1977cc] text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-200"
          >
            <Calendar className="w-5 h-5" />
            Book an Appointment
          </a>

          {user ? (
            <>
              {/* Notification */}
              <div className="translate-y-[3px]"><Notification /></div>

              {/* User Settings Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/path-to-user-image.jpg" alt="User" />
                    <AvatarFallback>TK</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52 mt-2">
                  <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    <a href="/user/profile">Profile</a>
                  </DropdownMenuItem>

                  {user.role === 0 && (
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <a href="/dashboard">Admin Dashboard</a>
                    </DropdownMenuItem>
                  )}


                  {user.role === 1 && (
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <a href="/consultant">Consultant Dashboard</a>
                    </DropdownMenuItem>
                  )}


                  {user.role === 2 && (
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <a href="/manager">Manager Dashboard</a>
                    </DropdownMenuItem>
                  )}


                  {user.role === 3 && (
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <a href="/user">Your Dashboard</a>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={handleLogout}
                    className="flex items-center gap-2 text-red-600 focus:text-white focus:bg-red-500 font-semibold transition duration-200 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // === IF USER IS NOT LOGGED IN, SHOW LOGIN/SIGNUP BUTTONS ===
            <div className="flex gap-2 items-center">
              <a href="/login" className="bg-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-800 transition duration-200 font-semibold">Log In</a>
              <a href="/signup" className="border-2 border-dark-blue text-dark-blue px-4 py-2 rounded-button hover:bg-blue-50 transition duration-200 font-semibold">Sign Up</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
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
                  <NavigationMenuLink href="#blog" className="nav-text text-xl">Blog</NavigationMenuLink>
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
        <div className="hidden lg:flex gap-2 items-center">
          <a href="/login" className="bg-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-800 transition duration-200 font-semibold">Log In</a>
          <a href="/signup" className="border-2 border-dark-blue text-dark-blue px-4 py-2 rounded-button hover:bg-blue-50 transition duration-200 font-semibold">Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md/15 sticky top-0 z-40 shadow-b">
      <div className="mx-10 px-2 flex justify-between items-center p-1">
        {/* Logo Section */}
        <a href="/" className="text-lg flex items-center gap-1">
          <img src="/images/logo.webp" alt="logo" className="w-[50px]" />
          <div className="logo">
            <div className="font-extrabold text-shadow-lg">Care4Gender</div>
            <div className="text-shadow-lg">Gender HealthCare</div>
          </div>
        </a>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6 font-medium items-center">
            <NavigationMenuItem>
              <NavigationMenuLink href="#top" className="nav-text text-xl">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-text text-xl">
                Menu
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white shadow-md rounded-lg p-4">
                <ul className="grid gap-3 w-[200px]">
                  <li>
                    <NavigationMenuLink href="#gynecology" className="block text-lg font-semibold">
                      Gynecology
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#cardiology" className="block text-lg font-semibold">
                      Cardiology
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#neurology" className="block text-lg font-semibold">
                      Neurology
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#dermatology" className="block text-lg font-semibold">
                      Dermatology
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#blog" className="nav-text text-xl">
                Blog
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#about-us" className="nav-text text-xl">
                About Us
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#appointment" className="nav-text text-xl">
                Book an appointment
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex gap-2 items-center">
          <a
            href="/login"
            className="bg-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-800 transition duration-200 font-semibold"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="border-2 border-dark-blue text-dark-blue px-4 py-2 rounded-button hover:bg-blue-50 transition duration-200 font-semibold"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

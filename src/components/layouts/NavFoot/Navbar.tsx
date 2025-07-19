import { memo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, User as UserIcon, Calendar, Settings, LogOut } from "lucide-react";
import logo from "@/assets/images/logo1.png";
import Notification from "@/components/Notification/Notification";

// --- Type Definitions ---
interface User {
  role: number;
  name?: string;
}

// --- Configurations ---
const dashboardConfig: Record<number, { path: string; label: string }> = {
  0: { path: "/dashboard", label: "Admin Dashboard" },
  1: { path: "/consultant", label: "Consultant Dashboard" },
  2: { path: "/manager", label: "Manager Dashboard" },
  3: { path: "/user", label: "Your Dashboard" },
  4: { path: "/doctor", label: "Doctor Dashboard" },
};

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/blogs", label: "Blog" },
  { to: "/about-us", label: "About" },
];

const ToTop = () => window.scrollTo({ top: 0 });

// --- Reusable Sub-Components ---

const Logo = memo(() => (
  <Link to="/" onClick={ToTop} className="flex items-center gap-1">
    <img src={logo} alt="logo" className="w-[60px]" />
    <div className="font-extrabold text-xl bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
      Care4Gender
    </div>
  </Link>
));

interface NavLinksProps {
  isMobile?: boolean;
}

const NavLinks = memo(({ isMobile = false }: NavLinksProps) => (
  <NavigationMenu>
    <NavigationMenuList className={isMobile ? "flex-col gap-3" : "flex gap-6"}>
      {navLinks.map((link) => (
        <NavigationMenuItem key={link.to}>
          <NavigationMenuLink asChild className="nav-text font-medium text-xl">
            <Link to={link.to} onClick={ToTop}>
              {link.label}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
));

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = memo(({ isMobile = false }: AuthButtonsProps) => (
  <div className={isMobile ? "flex flex-col gap-4 w-1/2" : "hidden lg:flex gap-2 items-center"}>
    <Link to="/login" className="bg-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-800 transition duration-200 font-semibold">Log In</Link>
    <Link to="/signup" className="border-2 border-dark-blue text-dark-blue px-4 py-2 rounded-button hover:bg-blue-50 transition duration-200 font-semibold">Sign Up</Link>
  </div>
));

const NotificationIcon = memo(() => (
  <div className="translate-y-[2px]"><Notification /></div>
));

interface UserAvatarDropdownProps {
  user: User;
  onLogout: () => void;
}

const UserAvatarDropdown = memo(({ user, onLogout }: UserAvatarDropdownProps) => {
  const userDashboard = dashboardConfig[user.role];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src="/path-to-user-image.jpg" alt={user.name || 'User'} />
          <AvatarFallback>TK</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/user/profile" className="flex items-center gap-2 cursor-pointer">
            <UserIcon className="w-4 h-4" /> Profile
          </Link>
        </DropdownMenuItem>
        {userDashboard && (
          <DropdownMenuItem asChild>
            <Link to={userDashboard.path} className="flex items-center gap-2 cursor-pointer">
              <Settings className="w-4 h-4" /> {userDashboard.label}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={onLogout}
          className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 font-semibold cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});


// --- Main Navbar Component ---

interface NavbarProps {
  variant?: 'public' | 'dashboard';
}

export default function Navbar({ variant = 'public' }: NavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (variant === 'public') {
      const handleScroll = () => setIsScrolled(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [variant]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // --- Dashboard Variant ---
  if (variant === 'dashboard') {
    return (
      <header className="mt-2 max-w-[99%] mx-auto relative flex h-15 items-center justify-between rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
        {/* Left Section */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Center Section: Nav Links for Customers */}
        <div className="hidden lg:flex flex-1 justify-center">
          {user && user.role === 3 && <div className="translate-x-10"><NavLinks /></div>}
        </div>

        {/* Right Section: Icons */}
        <div className="flex flex-shrink-0 items-center gap-4">
          {user && user.role == 3 && (
            <Button asChild className="bg-gradient-to-r from-[#1c2359] via-[#1a3973] to-[#1977cc] hover:brightness-110 rounded-full">
              <Link 
                to="/booking-info" 
                className="flex items-center gap-2"
                onClick={ToTop}
              >
                <Calendar className="w-5 h-5" />
                Book an Appointment
              </Link>
            </Button>
          )}
          {user && [1, 3, 4].includes(user.role) && <NotificationIcon />}
          {user && <UserAvatarDropdown user={user} onLogout={handleLogout} />}
        </div>
      </header>
    );
  }

  // --- Public Variant (Default) ---
  const navClass = isScrolled
    ? "translate-y-2 max-w-[99%] mx-auto relative h-15 rounded-xl bg-white/60 backdrop-blur-md shadow-lg/15"
    : "bg-white shadow-lg/15";

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-100 ${navClass}`}>
      <div className="mx-4 sm:mx-10 px-2 flex justify-between items-center h-full">
        <div className="flex items-center gap-6 flex-1">
          <Logo />
          {(!user || user.role === 3) && (
            <div className="hidden lg:flex justify-center flex-1">
              <div className="translate-x-10"><NavLinks /></div>
            </div>
          )}
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger className="p-2">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px] sm:w-[300px] pt-16">
              <div className="flex flex-col gap-4 items-center text-center">
                {(!user || user.role === 3) && <NavLinks isMobile />}
                {user ? (
                  <div className="flex flex-col gap-8 items-center pt-4">
                    <Link className="nav-text font-medium text-xl" to={dashboardConfig[user.role]?.path ?? '/'}>Dashboard</Link>
                    <Button variant="destructive" className="w-40 text-lg bg-red-500 cursor-pointer" onClick={handleLogout}>Logout</Button>
                  </div>
                ) : (
                  <AuthButtons isMobile />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              {user.role === 3 && (
                <Button asChild className="bg-gradient-to-r from-[#1c2359] via-[#1a3973] to-[#1977cc] hover:brightness-110 rounded-full">
                  <Link 
                    to="/booking-info"
                    onClick={ToTop}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book an Appointment
                  </Link>
                </Button>
              )}
              {[1, 3].includes(user.role) &&
                <NotificationIcon />
              }
              <UserAvatarDropdown user={user} onLogout={handleLogout} />
            </>
          ) : <AuthButtons />}
        </div>
      </div>
    </nav>
  );
};
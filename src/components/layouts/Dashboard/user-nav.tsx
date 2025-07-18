import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export function NavAvatar() {
  // const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none ml-auto">
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

        <DropdownMenuSeparator />
        <DropdownMenuItem
          // onSelect={handleLogout}
          className="flex items-center gap-2 text-red-600 focus:text-white focus:bg-red-500 font-semibold transition duration-200 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
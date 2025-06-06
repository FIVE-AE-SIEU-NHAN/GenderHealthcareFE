// src/components/user-nav.tsx

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { CreditCard, LogOut, Settings, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function UserNav() {
  // Mock user data - replace with your auth context
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png", // A placeholder avatar
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1 py-2">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user.email}
          </p>
        </div>
        <Separator />
        <div className="flex flex-col py-1">
          <Link to="/profile" className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start px-2 py-1.5 text-sm font-normal"
            >
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Link to="/billing" className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start px-2 py-1.5 text-sm font-normal"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </Button>
          </Link>
          <Link to="/settings" className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start px-2 py-1.5 text-sm font-normal"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
        <Separator />
        <Button
          variant="ghost"
          className="w-full justify-start px-2 py-1.5 text-sm font-normal"
          onClick={() => alert("Logging out!")} // Replace with your logout logic
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
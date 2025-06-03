import { useState } from "react";
import { useRole } from "@/contexts/RoleContext";
import { UserRole } from "@/types/UserRole";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-50 group">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            title="Switch Role"
            className={`
              h-8 
              rounded-full 
              bg-transparent 
              shadow 
              overflow-hidden 
              whitespace-nowrap 
              transition-all 
              duration-400
              px-0
              w-8
              group-hover:w-30
              group-hover:px-0
              ${open ? "w-28 px-3" : ""}
              flex items-center gap-2
            `}
          >
            <span className="translate-x-1">🧪</span>
            <span
              className={`
                max-w-0 
                overflow-hidden 
                transition-[max-width] 
                duration-300 
                ease-in-out 
                whitespace-nowrap
                ${open ? "max-w-full" : "group-hover:max-w-[8rem]"}
                block
              `}
            >
              {role}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-35 p-3">
          <Select
            value={role}
            onValueChange={(value) => {
              setRole(value as UserRole);
              setOpen(false);
            }}
          >
            <SelectTrigger className="w-full h-8">
              <SelectValue placeholder="Switch role" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(UserRole).map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>
    </div>
  );
}

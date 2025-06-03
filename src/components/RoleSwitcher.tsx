import { useState } from "react";
import { useRole } from "../contexts/RoleContext";
import { UserRole } from "../types/UserRole";
// import { cn } from "@/lib/utils"; 

export default function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 text-sm">
      <div
        onClick={() => setOpen(!open)}
        className="bg-black text-white px-3 py-1 rounded-full cursor-pointer shadow hover:bg-gray-800"
      >
        🧪 {role}
      </div>

      {open && (
        <div className="mt-2 bg-white rounded shadow p-2 border">
          <div className="mb-1 text-gray-700 font-medium">Switch Role</div>
          <select
            className="w-full border p-1 text-sm"
            value={role}
            onChange={(e) => {
              setRole(e.target.value as UserRole);
              setOpen(false); // optional auto-close
            }}
          >
            {Object.values(UserRole).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

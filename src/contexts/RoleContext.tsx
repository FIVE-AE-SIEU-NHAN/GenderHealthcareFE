// Application/context/RoleContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { UserRole } from "@/types/UserRole";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem("user-role") as UserRole) || UserRole.Guest;
  });

  useEffect(() => {
    localStorage.setItem("user-role", role);
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used inside RoleProvider");
  return context;
};

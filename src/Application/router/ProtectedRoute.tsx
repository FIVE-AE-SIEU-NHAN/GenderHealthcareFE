import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { USER_ROLE } from "@/Application/constants/admin/admin.userConstants";
import { Loader2 } from 'lucide-react';

type AllowedRoleString = keyof typeof USER_ROLE.API_MAP;

interface ProtectedRouteProps {
  allowedRoles: AllowedRoleString[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const context = useOutletContext(); 

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRoleName = USER_ROLE.UI_MAP[user.role as keyof typeof USER_ROLE.UI_MAP];

  if (!userRoleName || !allowedRoles.includes(userRoleName as AllowedRoleString)) {
    return <Navigate to="/unauth" replace />;
  }
  
  return <Outlet context={context} />;
};

export default ProtectedRoute;
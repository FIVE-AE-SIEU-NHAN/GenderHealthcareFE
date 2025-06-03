import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "@/types/UserRole";
import { useRole } from "@/contexts/RoleContext";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { role } = useRole();
  console.log("Current role from context:", role);
  console.log("Allowed roles:", allowedRoles);


  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauth" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;

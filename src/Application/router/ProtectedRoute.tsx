import { Navigate } from "react-router-dom";
import { UserRole } from "@/types/UserRole";

interface Props {
  allowedRoles: UserRole[];
  userRole: UserRole | null;
  children: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute = ({ allowedRoles, userRole, children, redirectPath = "/" }: Props) => {
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

import { Routes, Route } from "react-router-dom";
import CustomerRoutes from "./CustomerRoutes";
import AdminRoutes from "./AdminRoutes";
import HomePage from "@/pages/Common/Home/Homepage";
import LoginPage from "@/pages/Auth/Login/Login";
import NotFound from "@/pages/Common/NotFound";
import PublicLayout from "@/components/layouts/PublicLayout";
import { isUserRole, USER_ROLES, UserRole } from "@/types/UserRole";

const AppRouter = () => {
  const rawRole = localStorage.getItem("userRole");
  const userRole: UserRole | null = isUserRole(rawRole) ? rawRole : null;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Role-Based Routes */}
      {userRole === USER_ROLES.USER && (
        <Route path="/customer/*" element={<CustomerRoutes userRole={userRole} />} />
      )}

      {userRole === USER_ROLES.ADMIN && (
        <Route path="/admin/*" element={<AdminRoutes userRole={userRole} />} />
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;

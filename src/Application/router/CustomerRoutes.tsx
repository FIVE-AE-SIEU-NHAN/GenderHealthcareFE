import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CustomerDashboard from "@/pages/Customer/Dashboard";
import { USER_ROLES, UserRole } from "@/types/UserRole";
import NotFound from "@/pages/Common/NotFound";

const CustomerRoutes = ({ userRole }: { userRole: UserRole | null }) => (
  <Routes>
    <Route
      path="/customer"
      element={
        <ProtectedRoute allowedRoles={[USER_ROLES.USER]} userRole={userRole}>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<CustomerDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default CustomerRoutes;

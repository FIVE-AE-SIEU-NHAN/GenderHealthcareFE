import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminDashboard from "@/pages/Admin/Dashboard";
import { USER_ROLES, UserRole } from "@/types/UserRole";

const AdminRoutes = ({ userRole }: { userRole: UserRole | null }) => (
  <Routes>
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} userRole={userRole}>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<AdminDashboard />} />
    </Route>
  </Routes>
);

export default AdminRoutes;

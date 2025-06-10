import { Route } from "react-router-dom";
import { UserRole } from "../../types/UserRole";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout";
import AdminDashboard from "@/pages/Admin/Dashboard";
import BlogListDashboard from "@/components/layouts/Dashboard/blog/BlogList";
import { adminSidebarItems } from "@/Application/constants/adminSidebarItems";
import UserListDashboard from "@/components/layouts/Dashboard/user/UserListAPI";

export const AdminRoutes = (
  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute allowedRoles={[UserRole.Admin]}>
        <DashboardLayout
          sidebarItems={adminSidebarItems}
        />
      </ProtectedRoute>
    }
  >
    <Route index element={<AdminDashboard />} />
    <Route path="blog/list" element={<BlogListDashboard />} />
    <Route path="users/list" element={<UserListDashboard />} />
    {/* Add more nested admin routes here */}
  </Route>
);

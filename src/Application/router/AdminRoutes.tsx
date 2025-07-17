// src/router/AdminRoutes.tsx
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; 
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout";
import AdminDashboard from "@/pages/Admin/Dashboard";
import BlogListDashboard from "@/pages/Manager/blog/BlogList";
import { adminSidebarItems } from "@/Application/constants/admin/adminSidebarItems";
import UserListDashboard from "@/pages/Admin/user/UserList";

export const AdminRoutes = (
  <Route
    path="/dashboard" 
    element={<DashboardLayout sidebarItems={adminSidebarItems} />}
  >
    <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
      
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<UserListDashboard />} />

    </Route>
  </Route>
);
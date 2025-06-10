import { Route } from "react-router-dom";
import { UserRole } from "../../types/UserRole";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout";
import AdminDashboard from "@/pages/Admin/Dashboard";
import DashboardBlogList from "@/pages/Admin/DashboardBlogList"; 
import BlogCreate from "@/pages/Admin/BlogCreate"; 
import BlogEdit from "@/pages/Admin/BlogEdit"; 
import DashboardHome from "@/pages/Admin/DashboardMain"; 
import { adminSidebarItems } from "@/Application/constants/adminSidebarItems";
import Cycle from "@/pages/Admin/CycleHistory"; 
export const AdminRoutes = (
  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute allowedRoles={[UserRole.Admin]}>
        <DashboardLayout sidebarItems={adminSidebarItems} />
      </ProtectedRoute>
    }
  >
    <Route index element={<DashboardBlogList/>} />
    <Route path="blog/list" element={<DashboardBlogList />} />
    <Route path="blog/create" element={<BlogCreate />} />
    <Route path="blog/edit/:id" element={<BlogEdit />} />
    <Route path="home" element={<DashboardHome />} />
    <Route path="cycle" element={<Cycle />} />
  </Route>
);

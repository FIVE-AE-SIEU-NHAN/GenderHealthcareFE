import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout"; // Re-use the same layout
import { managerSidebarItems } from "@/Application/constants/manager/managerSidebarItems";
import QuestionListDashboard from "@/pages/Manager/Questions/QuestionList";
import ManagerDashboard from "@/pages/Manager/Dashboard";
import ConsultantListDashboard from "@/pages/Manager/ConsultantManagement/ConsultantsList";

export const ManagerRoutes = (
  <Route 
    path="/manager" 
    element={<DashboardLayout sidebarItems={managerSidebarItems} />}
  >
    <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
      <Route index element={<ManagerDashboard />} />
      <Route path="questions" element={<QuestionListDashboard />} />
      <Route path="consultants" element={<ConsultantListDashboard />} />

    </Route>
  </Route>
);
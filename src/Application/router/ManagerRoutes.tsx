import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout"; // Re-use the same layout
import CustomerDashboard from "@/pages/Customer/Dashboard";
import { managerSidebarItems } from "@/Application/constants/manager/managerSidebarItems";
import QuestionListDashboard from "@/pages/Manager/Questions/QuestionList";

export const ManagerRoutes = (
  <Route 
    path="/manager" 
    element={<DashboardLayout sidebarItems={managerSidebarItems} />}
  >
    <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
      <Route index element={<CustomerDashboard />} />
      <Route path="questions" element={<QuestionListDashboard />} />

    </Route>
  </Route>
);
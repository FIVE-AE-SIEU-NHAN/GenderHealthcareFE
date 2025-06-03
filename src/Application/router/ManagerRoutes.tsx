import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout"
// import { managerSidebarItems } from "@/Application/constants/managerSidebarItems"
import { UserRole } from "@/types/UserRole"
// import ManagerDashboard from "@/pages/Manager/Dashboard"
// import ReportPage from "@/pages/dashboard/manager/Reports"

export const ManagerRoutes = (
  <Route
    path="/manager"
    element={
      <ProtectedRoute allowedRoles={[UserRole.Manager]}>
        <DashboardLayout
          // sidebarItems={managerSidebarItems}
        />
      </ProtectedRoute>
    }
  >
    {/* <Route index element={<ManagerDashboard />} />
    <Route path="reports" element={<ReportPage />} /> */}
    {/* Add more manager pages here */}
  </Route>
)

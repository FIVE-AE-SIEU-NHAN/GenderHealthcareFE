import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout"
// import { customerSidebarItems } from "@/Application/constants/customerSidebarItems"
import { UserRole } from "@/types/UserRole"
import CustomerDashboard from "@/pages/Customer/Dashboard"
// import CustomerAppointments from "@/pages/dashboard/customer/Appointments"

export const CustomerRoutes = (
  <Route
    path="/customer"
    element={
      <ProtectedRoute allowedRoles={[UserRole.Customer]}>
        <DashboardLayout
          // sidebarItems={customerSidebarItems}
        />
      </ProtectedRoute>
    }
  >
    <Route index element={<CustomerDashboard />} />
    {/* <Route path="appointments" element={<CustomerAppointments />} /> */}
    {/* Add more customer pages here */}
  </Route>
)

import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout"; // Re-use the same layout
import CustomerDashboard from "@/pages/Customer/Dashboard";
import { customerSidebarItems } from "@/Application/constants/customer/customerSidebarItems";
import AppointmentHistory from "@/pages/Customer/Appointment/AppointmentHistory";

export const CustomerRoutes = (
  <Route 
    path="/doctor" 
    element={<DashboardLayout sidebarItems={customerSidebarItems} />}
  >
    <Route element={<ProtectedRoute allowedRoles={['Doctor']} />}>
      <Route index element={<CustomerDashboard />} />
      <Route path="appointments" element={<AppointmentHistory />} />

    </Route>
  </Route>
);
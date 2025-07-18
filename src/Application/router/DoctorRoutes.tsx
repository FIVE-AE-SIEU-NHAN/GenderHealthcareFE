import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout"; // Re-use the same layout
import CustomerDashboard from "@/pages/Customer/Dashboard";
import BlogListDashboard from "@/pages/Doctor/Blogs/BlogList";
import { doctorSidebarItems } from "../constants/doctor/doctorSidebarItems";
import ConsultantAppointmentCalendar from "@/pages/Consultant/Appointments/AppointmentCalendar";
import DoctorProfilePage from "@/pages/Doctor/Profile/Profile";

export const DoctorRoutes = (
  <Route 
    path="/doctor" 
    element={<DashboardLayout sidebarItems={doctorSidebarItems} />}
  >
    <Route element={<ProtectedRoute allowedRoles={['Doctor']} />}>
      <Route index element={<CustomerDashboard />} />
      <Route path="appointments" element={<ConsultantAppointmentCalendar />} />
      <Route path="blogs" element={<BlogListDashboard />} />
      <Route path="profile" element={<DoctorProfilePage />} />
    </Route>
  </Route>
);
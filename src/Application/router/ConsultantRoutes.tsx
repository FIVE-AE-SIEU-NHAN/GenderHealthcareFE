import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout"; // Re-use the same layout
import { consultantSidebarItems } from "@/Application/constants/consultant/consultantSidebarItems";
import QuestionListDashboard from "@/pages/Consultant/Questions/QuestionList";
import ConsultantDashboard from "@/pages/Consultant/Dashboard";
import ConsultantProfilePage from "@/pages/Consultant/Profile/Profile";
import AppointmentCalendar from "@/pages/Consultant/Appointments/AppointmentCalendar";

export const ConsultantRoutes = (
  <Route 
    path="/consultant" 
    element={<DashboardLayout sidebarItems={consultantSidebarItems} />}
  >
    <Route element={<ProtectedRoute allowedRoles={['Consultant']} />}>
      <Route index element={<ConsultantDashboard />} />
      <Route path="questions" element={<QuestionListDashboard />} />
      <Route path="profile" element={<ConsultantProfilePage />} />
      <Route path="appointments" element={<AppointmentCalendar />} />
    </Route>
  </Route>
);
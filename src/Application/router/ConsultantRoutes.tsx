import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout"; // Re-use the same layout
import { consultantSidebarItems } from "@/Application/constants/consultant/consultantSidebarItems";
import QuestionListDashboard from "@/pages/Consultant/Questions/QuestionList";
import ConsultantDashboard from "@/pages/Consultant/Dashboard";
import MeetingRoom from "@/pages/Content/Consultation/MeetingRoom";

export const ConsultantRoutes = (
  <Route 
    path="/consultant" 
    element={<DashboardLayout sidebarItems={consultantSidebarItems} />}
  >
    <Route element={<ProtectedRoute allowedRoles={['Consultant']} />}>
      <Route index element={<ConsultantDashboard />} />
      <Route path="questions" element={<QuestionListDashboard />} />
      <Route path="chat" element={<MeetingRoom />} />
    </Route>
  </Route>
);
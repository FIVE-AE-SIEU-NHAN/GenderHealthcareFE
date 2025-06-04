import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout"
// import { doctorSidebarItems } from "@/Application/constants/doctorSidebarItems"
import { UserRole } from "@/types/UserRole"
// import DoctorDashboard from "@/pages/Doctor/Dashboard"
// import DoctorPatients from "@/pages/dashboard/doctor/Patients"

export const DoctorRoutes = (
  <Route
    path="/doctor"
    element={
      <ProtectedRoute allowedRoles={[UserRole.Doctor]}>
        <DashboardLayout
          // sidebarItems={doctorSidebarItems}
        />
      </ProtectedRoute>
    }
  >
    {/* <Route index element={<DoctorDashboard />} />
    <Route path="patients" element={<DoctorPatients />} /> */}
    {/* Add more doctor pages here */}
  </Route>
)
